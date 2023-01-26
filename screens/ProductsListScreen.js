import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { recommendedData } from "../data/productsData";
import ProductCard from "../components/ProductCard";
import ApiManager from "../axios";
import { useEffect } from "react";

export default function ProductsListScreen() {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const {
    params: { data },
  } = useRoute();

  const getProducts = async () => {
    try {
      const response = await ApiManager.get(
        "/products/category/" + data.title.toLowerCase()
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <TouchableOpacity
        className="absolute top-4 left-4 z-20"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" color="#f05f7a" size={40} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="rounded-b-[30px] overflow-hidden">
          <ImageBackground
            className="h-44 w-full"
            source={{
              uri: data.imgUrl,
            }}
            resizeMode="cover"
          >
            <View className="absolute z-10 bg-black/30 h-44 rounded-b-[30px] w-full"></View>

            <Text className="color-white text-3xl font-bold absolute left-4 z-20 bottom-6">
              {data.title}
            </Text>
          </ImageBackground>
        </View>
        <View className="px-4 pb-2 mt-5 flex-1">
          {!isLoading && (
            <Text className="font-black text-lg uppercase mb-1 ">
              Lista produktów ({products.length})
            </Text>
          )}
          <View className="flex-row flex-wrap mx-[-8px]">
            {isLoading ? (
              <View className="items-center justify-center flex-1 py-10">
                <ActivityIndicator size="large" />
              </View>
            ) : (
              products.map((data, key) => {
                return <ProductCard key={key} data={data} />;
              })
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
