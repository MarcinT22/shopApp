import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { undoRemoveItem } from "../features/basketSlice";
import { useDispatch } from "react-redux";
import { Animated } from "react-native";

export default function RemoveItem() {
  const dispatch = useDispatch();

  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const invervalID = setTimeout(() => {
      fadeOut();
    }, 2000);

    return () => {
      clearTimeout(invervalID);
    };
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const undoRemove = () => {
    fadeOut();

    dispatch(undoRemoveItem());
  };

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="absolute bottom-[70px] left-2 right-2 bg-[#efefef] border-l-4 border-[#229F85] p-4 flex-row justify-between items-center shadow shadow-black/50"
    >
      <Text className="text-sm">Usunięto produkt z koszyka</Text>
      <TouchableOpacity onPress={() => undoRemove()}>
        <Text className="color-[#229F85] font-bold uppercase font-base tracking-widest">
          Cofnij
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
