import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="absolute top-0 px-4 py-2 flex-row items-center bg-white justify-between relative">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="#f05f7a" size={30} />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          selectionColor="#229F85"
          placeholder="Wpisz czego szukasz"
          className="px-4 pr-12 py-2 text-sm border border-[#dfdfdf] w-4/5 rounded-[5px]"
        />

        <TouchableOpacity>
          <AntDesign name="search1" color="#229F85" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView className="bg-white flex-1  px-4 py-2">
        <Text className="text-base font-bold uppercase color-black mb-2">
          Ostatnie wyszukiwania
        </Text>
        <TouchableOpacity className="py-2">
          <Text className="text-sm color-black">Talerzyk ceramiczy</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-2">
          <Text className="text-sm color-black">Wazon</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-2">
          <Text className="text-sm color-black">
            Zestaw z ceramiki agatowej
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
