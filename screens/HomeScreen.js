import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import CategoriesFlatList from "../components/CategoriesFlatList";
import RecommendedProducts from "../components/RecommendedProducts";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <CategoriesFlatList />
        <RecommendedProducts />
      </ScrollView>
    </SafeAreaView>
  );
}
