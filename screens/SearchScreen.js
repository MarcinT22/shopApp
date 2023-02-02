import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [storageSearch, setStorageSearch] = useState([]);

  const search = async () => {
    try {
      storageSearch.push(searchText);
      const output = JSON.stringify(storageSearch);

      await AsyncStorage.setItem("searchDataStore", output);
    } catch (e) {
      console.log(e);
    }

    setSearchText("");
  };

  const getSearchList = async () => {
    try {
      const data = await AsyncStorage.getItem("searchDataStore");
      const output = JSON.parse(data);
      setStorageSearch(output);
    } catch (e) {
      console.log(e);
    }
  };

  const clear = async () => {
    setStorageSearch([]);
    const output = JSON.stringify([]);
    try {
      await AsyncStorage.setItem("searchDataStore", output);
    } catch (e) {
      console.log("clear error " + e);
    }
  };

  useEffect(() => {
    getSearchList();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className=" px-4 py-2 flex-row items-center bg-white justify-between relative">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="#f05f7a" size={30} />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          selectionColor="#229F85"
          placeholder="Wpisz czego szukasz"
          className="px-4 pr-12 py-2 text-sm border border-[#dfdfdf] w-4/5 rounded-[5px]"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />

        <TouchableOpacity onPress={() => search()}>
          <AntDesign name="search1" color="#229F85" size={24} />
        </TouchableOpacity>
      </View>
      {storageSearch.length > 0 ? (
        <View className="flex-1">
          <View className=" px-4 py-2 flex-row justify-between items-center">
            <Text className="text-base font-bold uppercase color-black">
              Ostatnie wyszukiwania
            </Text>
            <TouchableOpacity
              className="px-4 py-2 bg-[#f05f7a] rounded"
              onPress={() => clear()}
            >
              <Text className="text-white">Wyczyść</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className=" px-4 ">
            {storageSearch.map((item, index) => {
              return (
                <TouchableOpacity className="my-2" key={index}>
                  <Text className="text-sm color-black">{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <Text className="p-4 text-[#aaa]">Brak ostatnich wyszukiwań</Text>
      )}
    </SafeAreaView>
  );
}
