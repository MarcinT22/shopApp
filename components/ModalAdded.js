import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatPrice } from "../helpers/helpers";

export default function AddedCart({ data, quantity, setAddedCart }) {
  const navigation = useNavigation();
  return (
    <View className="absolute top-0 right-0 bottom-0 left-0 z-30 bg-black/50">
      <Modal animationType="slide" transparent={true}>
        <View className="absolute rounded-t-[10px]  top-2/3 right-0 left-0 bottom-0 p-4 bg-white">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">
              Produkt trafił do koszyka!
            </Text>
            <TouchableOpacity
              className="relative top-[-5px] right-[-5px]"
              onPress={() => setAddedCart(false)}
            >
              <MaterialIcons name="close" size={30} color="#aaa" />
            </TouchableOpacity>
          </View>
          <View className="flex-row py-4">
            <View className="rounded-[3px] overflow-hidden border border-[#f0f0f0] w-1/3">
              <Image
                className="w-full h-20"
                resizeMode="contain"
                source={{
                  uri: data.image,
                }}
              />
            </View>
            <View className="w-2/3 pl-3">
              <Text className="text-sm break-word " numberOfLines={2}>
                {quantity} x {data.title}
              </Text>
              <Text className="text-xl font-bold color-[#229F85]">
                {formatPrice(data.price)}
              </Text>
            </View>
          </View>
          <View className="absolute left-0 right-0 bottom-0 p-4 flex-row">
            <View className="w-1/2">
              <TouchableOpacity
                onPress={() => setAddedCart(false)}
                className="bg-[#229F85] mr-1 rounded-[3px] p-2 h-full justify-center"
              >
                <Text className="text-xs leading-5 color-white text-center font-bold uppercase">
                  Kontynuuj zakupy
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-1/2">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Cart");
                }}
                className="justify-center h-full leading-5  bg-[#F05F7A] ml-1 rounded-[3px] p-2"
              >
                <Text className="text-xs color-white text-center font-bold uppercase">
                  Przejdź do koszyka
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
