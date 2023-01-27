import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Login() {
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    console.log("login: " + login);
    console.log("password: " + password);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center  mt-[-100px] px-10 relative">
      <Image
        className="w-[180px] h-[50px] mb-10"
        source={{
          uri: "https://skrawkinatury.pl/skins/store_user/store_033c0b92ded3ced1903cfbda7fe14bbb_2/images/logo.png",
        }}
      />
      <Text className="color-black text-3xl font-black mb-6">Moje konto</Text>
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
        className="rounded-[10px] bg-[#229F85] w-full p-3"
        onPress={() => signIn()}
      >
        <Text className="color-white text-xl text-center font-black">
          Zaloguj się
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="color-[#229F85] text-base mt-3">
          Nie pamiętam hasła
        </Text>
      </TouchableOpacity>
      <View className="flex-row absolute bottom-6">
        <Text className="color-black text-base mr-1">Nie masz konta?</Text>
        <TouchableOpacity>
          <Text className="color-[#229F85] text-base">Zarejestruj się!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
