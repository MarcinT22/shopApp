import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ApiManager from "../axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async () => {
    if (!name) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Wprowadź nazwę użytkownika");
      return false;
    }
    if (!email) {
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
    if (!confirmPassword || confirmPassword != password) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Wprowadzone hasła nie są takie same");
      return false;
    }

    setError(false);
    setIsLoading(true);

    try {
      const response = await ApiManager.post(
        "https://api.escuelajs.co/api/v1/users/",
        {
          name: name,
          email: email,
          password: password,
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        }
      );
      navigation.navigate("Login");
    } catch (e) {
      setError(true);
      setErrorMessage("Wystąpił błąd!");
      console.log("Not registered!", e);
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
            Stwórz konto
          </Text>
          {error && (
            <View className="mb-6 p-2 w-full rounded-lg bg-red-50 border border-red-100">
              <Text className="text-center text-sm color-red-400">
                {errorMessage}
              </Text>
            </View>
          )}
          <TextInput
            placeholder="Nazwa użytkownika"
            placeholderTextColor="#B1B1B1"
            className="bg-[#F2F2F2] rounded-[10px] w-full h-12 text-base px-4 mb-5"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#B1B1B1"
            className="bg-[#F2F2F2] rounded-[10px] w-full h-12 text-base px-4 mb-5"
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Hasło"
            placeholderTextColor="#B1B1B1"
            className="bg-[#F2F2F2] rounded-[10px] w-full h-12 mb-5 text-base px-4 "
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            placeholder="Powtórz hasło"
            placeholderTextColor="#B1B1B1"
            className="bg-[#F2F2F2] rounded-[10px] mb-10 w-full h-12 text-base px-4 "
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            className="rounded-[10px] bg-[#229F85] justify-center items-center w-full p-3 h-14"
            onPress={() => signUp()}
          >
            {!isLoading ? (
              <Text className="color-white text-xl text-center font-black">
                Zarejestruj się
              </Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
