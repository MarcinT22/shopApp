import {
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader() {
  const navigation = useNavigation();
  return (
    <View className="relative rounded-b-[30px] overflow-hidden">
      <Image
        className="h-44 "
        source={{
          uri: "https://random.imagecdn.app/800/600",
        }}
      />
      <View className="bg-black/50 absolute top-0 right-0 left-0 bottom-0 z-10"></View>
      <View className="absolute top-[85px] left-4 right-4 justify-center items-centerz z-20">
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchScreen")}
          className="w-full"
        >
          <View className="border border-white/30 bg-white/20 rounded-[3px] p-3 flex-row hover:bg-black">
            <AntDesign name="search1" color="#ffffff" size={20} />
            <Text className="text-sm color-white ml-3">
              Wpisz czego szukasz
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="absolute z-20 flex content-center items-center top-[35px] left-0 right-0 justify-center items-center">
        <Image
          className="w-[180px] h-[30px]"
          source={{
            uri: "https://skrawkinatury.pl/skins/store_user/store_033c0b92ded3ced1903cfbda7fe14bbb_2/images/logo.png",
          }}
        />
      </View>
    </View>
  );
}
