import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CategoriesCard({ data }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mr-4 w-28"
      onPress={() => {
        navigation.navigate("ProductsListScreen", { data });
      }}
    >
      <View className="rounded overflow-hidden border border-[#f0f0f0]">
        <Image
          className="w-28 h-36"
          source={{
            uri: data.imgUrl,
          }}
          resizeMode="cover"
        />
      </View>

      <Text className="text-base color-black font-normal leading-4 mt-2">
        {data.title}
      </Text>
      <Text className="text-xs color-[#888]">({data.count})</Text>
    </TouchableOpacity>
  );
}
