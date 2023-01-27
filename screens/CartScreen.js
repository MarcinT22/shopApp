import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice, selectBasketItems } from "../features/basketSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CartItem from "../components/CartItem";
import RemoveItem from "../components/RemoveItem";
import { formatCurrency } from "react-native-format-currency";
import { formatPrice } from "../helpers/helpers";

export default function CartScreen() {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const totalPrice = useSelector(getTotalPrice);

  const [showRemove, setShowRemove] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(() => {
    if (items.length > 0) {
      fadeIn();
    } else {
      fadeOut();
    }
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      setShowRemove(false);
    });
  });

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
        <View>
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

      {showRemove && (
        <View
          className={`absolute z-20 left-2 right-2 ${
            items.length > 0 ? "bottom-36" : "bottom-20"
          }`}
        >
          <RemoveItem setShowRemove={setShowRemove} />
        </View>
      )}

      <Animated.View style={{ opacity: fadeAnim }}>
        <View className="pt-2 border-t border-[#f0f0f0] mb-16 py-2 px-4 flex-row items-center justify-between">
          <View>
            <Text className="color-black  text-base">Do zapłaty:</Text>
            <Text className="text-xl font-bold">{formatPrice(totalPrice)}</Text>
          </View>
          <TouchableOpacity className="bg-[#F05F7A] rounded-lg py-2 px-4">
            <Text className="color-white text-base uppercase font-bold">
              Kupuję i płacę
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
