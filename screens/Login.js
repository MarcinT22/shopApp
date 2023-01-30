import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ApiManager from "../axios";
import { useDispatch } from "react-redux";
import { userSignIn } from "../features/userSlice";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../features/userSlice";

export default function Login() {
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [login, setLogin] = useState("kevinryan");
  const [password, setPassword] = useState("kev02937@");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getUserData = async () => {
    try {
      const response = await ApiManager.get(
        "/users/" + Math.floor(Math.random() * 10)
      );

      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    if (!login) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Wprowadź adres e-mail");
      return false;
    }
    if (!password) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Wprowadź hasło");
      return false;
    }

    setError(false);
    setIsLoading(true);

    try {
      const response = await ApiManager.post(
        "https://fakestoreapi.com/auth/login",
        {
          username: login,
          password: password,
        }
      );

      await dispatch(userSignIn(response.data.token));
      getUserData();

      navigation.navigate("AccountData");
    } catch (error) {
      setError(true);
      setErrorMessage("Nieprawidłowy e-mail lub hasło");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="items-center justify-center flex-1 bg-white  mt-[-100px] px-10 relative">
          <Image
            className="w-[180px] h-[50px] mb-10"
            source={{
              uri: "https://skrawkinatury.pl/skins/store_user/store_033c0b92ded3ced1903cfbda7fe14bbb_2/images/logo.png",
            }}
          />

          <Text className="color-black text-3xl font-black mb-6">
            Moje konto
          </Text>
          {error && (
            <View className="mb-6 p-2 w-full rounded-lg bg-red-50 border border-red-100">
              <Text className="text-center text-sm color-red-400">
                {errorMessage}
              </Text>
            </View>
          )}
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#B1B1B1"
            className="bg-[#F2F2F2] rounded-[10px] w-full h-12 text-base px-4 mb-5"
            onChangeText={(text) => setLogin(text)}
          />
          <View className="mb-10 w-full relative">
            <TextInput
              placeholder="Hasło"
              placeholderTextColor="#B1B1B1"
              className="bg-[#F2F2F2] rounded-[10px] w-full h-12 text-base px-4 "
              secureTextEntry={isSecurePassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              className="absolute right-2 top-0 bottom-0 justify-center "
              onPress={() => setIsSecurePassword(!isSecurePassword)}
            >
              <Ionicons
                name={isSecurePassword ? "eye" : "eye-off"}
                color="#6F6F6F"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="rounded-[10px] bg-[#229F85] justify-center items-center w-full p-3 h-14"
            onPress={() => signIn()}
          >
            {!isLoading ? (
              <Text className="color-white text-xl text-center font-black">
                Zaloguj się
              </Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="color-[#229F85] text-base mt-3">
              Nie pamiętam hasła
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center pb-3">
          <Text className="color-black text-base mr-1 ">Nie masz konta?</Text>
          <TouchableOpacity>
            <Text className="color-[#229F85] text-base ">Zarejestruj się!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
