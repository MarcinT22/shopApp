import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ data }) {
  const navigation = useNavigation();
  return (
    <View className="w-1/2 p-2 ">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductScreen", { data });
        }}
      >
        <View className="border border-[#f0f0f0] rounded">
          <Image
            className="w-full h-36 rounded "
            source={{
              uri: data.imgUrl,
            }}
            resizeMode="contain"
          />
        </View>
        <Text className="text-xm leading-5 color-black" numberOfLines={2}>
          {data.title}
        </Text>
        <Text className="text-lg font-bold color-[#229F85]">{data.price}</Text>
      </TouchableOpacity>
    </View>
  );
}
