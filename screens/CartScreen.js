import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import CartItem from "../components/CartItem";
import RemoveItem from "../components/RemoveItem";

export default function CartScreen() {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);

  const [showRemove, setShowRemove] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="fixed p-5">
        <TouchableOpacity
          className="absolute top-3.5 left-4 z-20"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" color="#444" size={40} />
        </TouchableOpacity>
        <Text className="text-2xl text-center color-black font-black">
          Koszyk
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="bt-14 px-4">
        <View className="pb-16">
          {items.length > 0 ? (
            items.map((data, key) => {
              return (
                <CartItem key={key} data={data} setShowRemove={setShowRemove} />
              );
            })
          ) : (
            <View className="flex-1 bg-white justify-center items-center">
              <Image
                resizeMode="contain"
                className="w-full h-80"
                source={{
                  uri: "https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=",
                }}
              />
              <Text className="text-base text-center color-[#ccc]">
                Twój koszyk jest pusty
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {showRemove && <RemoveItem setShowRemove={setShowRemove} />}
    </SafeAreaView>
  );
}
