import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center  mt-[-100px] px-10">
      <Image
        className="w-[180px] h-[50px] mb-10"
        source={{
          uri: "https://skrawkinatury.pl/skins/store_user/store_033c0b92ded3ced1903cfbda7fe14bbb_2/images/logo.png",
        }}
      />
      <Text className="color-black text-3xl font-black mb-6">Moje konto</Text>
      <TouchableOpacity
        className="rounded-[10px] bg-[#229F85] w-full p-3"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="color-white text-xl text-center font-black">
          Zaloguj się
        </Text>
      </TouchableOpacity>
      <Text className="color-black text-xl mb-3 mt-10">Nie masz konta?</Text>
      <TouchableOpacity
        className="rounded-[10px] bg-[#F05F7A] w-full p-3"
        onPress={() => navigation.navigate("Register")}
      >
        <Text className="color-white text-xl text-center font-black">
          Zarejestruj się
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;
