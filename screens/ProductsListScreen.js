import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { recommendedData } from "../data/productsData";
import ProductCard from "../components/ProductCard";

export default function ProductsListScreen() {
  const navigation = useNavigation();

  const {
    params: { data },
  } = useRoute();

  return (
    <SafeAreaView className="bg-white">
      <TouchableOpacity
        className="absolute top-4 left-4 z-20"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" color="#f05f7a" size={40} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <View className="absolute z-10 bg-black/30 h-44 rounded-b-[30px] w-full"></View>
          <Image
            className="h-44 rounded-b-[30px]"
            source={{
              uri: data.imgUrl,
            }}
            resizeMode="contain"
          />
          <Text className="color-white text-3xl font-bold absolute left-4 z-20 bottom-6">
            {data.title}
          </Text>
        </View>
        <View className="px-4 pb-2 mt-5">
          <Text className="font-black text-lg uppercase mb-1 ">
            Lista produktów ({recommendedData.length})
          </Text>
          <View className="flex-row flex-wrap mx-[-8px]">
            {recommendedData.map((data, key) => {
              return <ProductCard key={key} data={data} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
