import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProductGallery from "../components/ProductGallery";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { addToBasket, setCount } from "../features/basketSlice";

import ModalAdded from "../components/ModalAdded";

export default function ProductScreen() {
  const navigation = useNavigation();

  const {
    params: { data },
  } = useRoute();

  const [counter, setCounter] = useState(1);
  const [addedCart, setAddedCart] = useState(false);

  const incrementCounter = () => {
    if (counter < data.count) {
      setCounter(counter + 1);
    }
  };

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(setCount(counter));
    dispatch(addToBasket(data));
    setAddedCart(true);
  };

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View>
        <TouchableOpacity
          className="absolute top-4 left-4 z-20"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" color="#f05f7a" size={40} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="relative">
            <ProductGallery images={data.gallery ? data.gallery : null} />
          </View>
          <View className="px-4 pb-5 pt-2">
            <Text className="text-2xl font-bold color-bold mb-5">
              {data.title}
            </Text>
            <View className="flex-row justify-between items-center">
              <View className="w-1/2">
                <Text className="text-base leading-7">
                  Dostępność: {data.count} szt.
                </Text>
                <Text className="text-base  leading-7">
                  Wysyłka: do 48 godzin
                </Text>
              </View>
              <View className="w-1/2">
                {data.oldPrice && (
                  <Text className="line-through text-right font-semibold text-3xl color-[#d2d2d2]">
                    {data.oldPrice}
                  </Text>
                )}
                <Text className="text-4xl text-right font-semibold color-[#229f85]">
                  {data.price}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center py-8">
              <View className="flex-row items-center">
                <TouchableOpacity
                  disabled={counter == 1}
                  className={`w-10 h-10 rounded-[5px] justify-center items-center  ${
                    counter == 1 ? "bg-[#D2D2D2]" : "bg-[#229f85]"
                  }  `}
                  onPress={() => {
                    decrementCounter();
                  }}
                >
                  <Ionicons
                    name="remove"
                    size={16}
                    color={counter == 1 ? "#000" : "#fff"}
                  />
                </TouchableOpacity>
                <View className="w-10 h-10 rounded-[5px]  justify-center items-center  bg-[#fff] border border-[#d2d2d2] mx-3">
                  <Text className=" color-[#848484] text-xl">{counter}</Text>
                </View>
                <TouchableOpacity
                  disabled={counter == data.count}
                  className={`w-10 h-10 rounded-[5px] justify-center items-center  ${
                    counter == data.count ? "bg-[#D2D2D2]" : "bg-[#229f85]"
                  }  `}
                  onPress={() => {
                    incrementCounter();
                  }}
                >
                  <Ionicons
                    name="add"
                    size={16}
                    color={counter == data.count ? "#000" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  className="flex-row items-center justify-between bg-[#f05f7a] rounded-[5px] px-3 h-10"
                  onPress={() => addItemToBasket()}
                >
                  <Text className="color-white text-lg uppercase font-bold">
                    Do koszyka
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-lg font-light">{data.description}</Text>
          </View>
        </ScrollView>
      </View>

      {addedCart && (
        <ModalAdded
          data={data}
          quantity={counter}
          setAddedCart={setAddedCart}
        />
      )}
    </SafeAreaView>
  );
}
