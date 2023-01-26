import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoriesCard from "./CategoriesCard";
import { categoriesData } from "../data/categoriesData";
import { useState } from "react";
import ApiManager from "../axios";

export default function CategoriesFlatList({ categories }) {
  return (
    <View className="py-5">
      <Text className="font-black text-lg uppercase mb-1 px-4">Kategorie</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((data, key) => {
          return (
            <View key={key}>
              <CategoriesCard data={data}></CategoriesCard>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
