import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ApiManager from "../axios";

export default function CategoriesCard({ data }) {
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getQuantity = async () => {
    try {
      const response = await ApiManager.get(`/products/?categoryId=${data.id}`);
      setQuantity(response.data.length);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getQuantity();
  }, []);

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
            uri: data.image,
          }}
          resizeMode="cover"
        />
      </View>

      <Text className="text-base color-black font-normal leading-4 mt-2">
        {data.name}
      </Text>

      {!isLoading ? (
        <Text className="text-xs color-[#888]">({quantity})</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
}
