import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { formatPrice } from "../helpers/helpers";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromBasket,
  removeItem,
} from "../features/basketSlice";

export default function CartItem({ data, setShowRemove }) {
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch(incrementQuantity(data.id));
  };

  const decrementCounter = () => {
    dispatch(decrementQuantity(data.id));
  };

  const remove = () => {
    setShowRemove(false);
    setTimeout(() => {
      setShowRemove(true);
    }, 200);
    dispatch(removeItem(data));
  };

  return (
    <View className="mb-4 rounded-[10px] flex-row bg-white shadow-lg border border-[#efefef] shadow-black/50 ">
      <View className="w-1/3">
        <Image
          source={{ uri: data.imgUrl }}
          className="w-28 h-24 rounded-[10px]"
          resizeMode="cover"
        />
      </View>

      <View className="w-2/3 pl-2 pt-2 pr-12 relative">
        <Text numberOfLines={2} className="text-xs">
          {data.title}
        </Text>
        <Text className="font-semibold text-lg">{formatPrice(data.price)}</Text>
        <TouchableOpacity
          onPress={() => remove()}
          className="absolute right-12 bottom-2"
        >
          <Ionicons name="trash-outline" size={24} color="#F05F7A" />
        </TouchableOpacity>
        <View className="absolute right-2 top-0 bottom-0 w-8 justify-center items-center">
          <View className="h-20 w-8 bg-[#f1f0f0] p-1 rounded-[5px] items-center justify-between">
            <TouchableOpacity
              onPress={() => incrementCounter()}
              disabled={data.quantity == data.count}
            >
              <Ionicons
                name="add"
                size={20}
                color={data.quantity == data.count ? "#ccc" : "#229F85"}
              />
            </TouchableOpacity>
            <Text className="text-center color-black text-sm">
              {data.quantity}
            </Text>
            <TouchableOpacity
              disabled={data.quantity == 1}
              onPress={() => decrementCounter()}
            >
              <Ionicons
                name="remove"
                size={20}
                color={data.quantity == 1 ? "#ccc" : "#229F85"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
