import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import CategoriesFlatList from "../components/CategoriesFlatList";
import RecommendedProducts from "../components/RecommendedProducts";
import { useState } from "react";
import ApiManager from "../axios";
import { useEffect } from "react";
// import { categoriesData } from "../data/categoriesData";

export default function HomeScreen() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const categories = await ApiManager.get("/categories");
      const products = await ApiManager.get("/products?offset=0&limit=10");

      setCategoriesData(categories.data);
      setProducts(products.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {isLoading && (
        <View className="absolute z-10 right-0 left-0 top-0 bottom-0  flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <Text
          className="text-center text-3xl "
          style={{ fontFamily: "Itim-Regular" }}
        >
          Lorem ipsum
        </Text>
        {!isLoading && (
          <View>
            <CategoriesFlatList categories={categoriesData} />
            <RecommendedProducts products={products} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
