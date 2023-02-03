import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isSignedIn,
  logout,
  getUserData,
  setUser,
} from "../features/userSlice";
import { useNavigation } from "@react-navigation/native";
import ApiManager from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useLayoutEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function AccountData() {
  const navigation = useNavigation();
  const user = useSelector(getUserData);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [changeData, setChangeData] = useState("");

  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadData(uri);
    }
  };

  const uploadData = async (image) => {
    const uploadData = new FormData();
    uploadData.append("file", {
      type: "image/jpg",
      uri: image,
      name: "uploadimagetmp.jpg",
    });

    let res = await ApiManager.post(
      "https://api.escuelajs.co/api/v1/files/upload",
      uploadData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUploadImage(res.data.filename);
  };

  const logoutUser = async () => {
    try {
      await dispatch(logout());
      navigation.navigate("Account");
    } catch (error) {}
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await ApiManager.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch(setUser(response.data));
    } catch (e) {
      logoutUser();
    } finally {
      setIsLoading(false);
    }
  };

  const update = async () => {
    setIsLoading(true);

    try {
      const response = await ApiManager.put(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
        {
          avatar: `https://api.escuelajs.co/api/v1/files/${uploadImage}`,
        }
      );
      setImage(null);
      getUser();
    } catch (e) {
      console.log("update error " + e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => {
      setImage(null);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {!isLoading ? (
        <View className="flex-1 bg-white px-4 justify-between pb-20">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="justify-center items-end">
              <TouchableOpacity onPress={() => logoutUser()} className="mt-2 ">
                <Text className="color-white font-bold text-sm text-center text-[#F05F7A] border border-[#F05F7A] p-2 rounded-lg">
                  Wyloguj
                </Text>
              </TouchableOpacity>
            </View>
            <View className="py-2">
              <View>
                <View className="justify-center items-center ">
                  <View className="relative overflow-hidden  rounded-full">
                    {user.avatar ? (
                      <Image
                        source={{ uri: image ? image : user.avatar }}
                        className="w-60 h-60 "
                      />
                    ) : (
                      <View className="w-72 h-72 bg-gray-600"></View>
                    )}

                    <View className="absolute bottom-0 w-32 h-72 rotate-12 bg-white/20"></View>
                  </View>
                  <Text className="text-2xl font-bold color-black mt-2">
                    Witaj <Text className="capitalize">{user.name}</Text>!
                  </Text>
                  <Text className="m-2 color-[#bbb] text-base">
                    {user.email}
                  </Text>
                  <View className="w-full mt-6">
                    <TextInput
                      placeholder="Nowy adres-email"
                      className="bg-[#f0f0f0] p-2 rounded w-full"
                      placeholderTextColor="#aaa"
                      onChangeText={(text) => setChangeData(text)}
                    />
                  </View>

                  <TouchableOpacity
                    className="flex-row px-4 py-2 m-2 items-center justify-center bg-orange-300 rounded-full"
                    onPress={pickImage}
                  >
                    <AntDesign name="picture" color="#000" size={20} />
                    <Text className="ml-2">Wybierz zdjęcie</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => update()}
                    className="p-2 m-2 bg-blue-300 rounded-full w-1/3"
                  >
                    <Text className="text-white text-center">Zapisz</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <MapView
              className="w-full h-80"
              initialRegion={{
                latitude: 49.8013615,
                longitude: 18.7823873,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <Marker
                coordinate={{ latitude: 49.8013615, longitude: 18.7823873 }}
                title="BM Skoczów Punkt 1"
                description="Skoczów, ul. Wałowa 3"
              ></Marker>
              <Marker
                coordinate={{ latitude: 49.8016531, longitude: 18.7860007 }}
                title="BM Skoczów Punkt 2"
                description="Skoczów, Galeria Pledan"
              ></Marker>
            </MapView>
          </ScrollView>
        </View>
      ) : (
        <View className="justify-center items-center  flex-1 bg-white">
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}
