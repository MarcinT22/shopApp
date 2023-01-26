import { View, Text, ScrollView } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import { recommendedData } from "../data/productsData";

export default function RecommendedProducts({ products }) {
  return (
    <View className="px-4 pb-14">
      <Text className="font-black text-lg uppercase mb-1 ">
        Polecane produkty
      </Text>
      <View className="flex-row flex-wrap mx-[-8px]">
        {products.map((data, key) => {
          return <ProductCard key={key} data={data} />;
        })}
      </View>
    </View>
  );
}
