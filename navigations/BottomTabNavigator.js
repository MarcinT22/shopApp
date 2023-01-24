import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import Account from "../screens/Account";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  const items = useSelector(selectBasketItems);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "#dfdfdf",
          height: 50,
          borderRadius: 30,
          marginHorizontal: 15,
          bottom: 10,
          position: "absolute",
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#444",
        tabBarActiveTintColor: "#229F85",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size}></Ionicons>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Cart"
        options={{
          headerShown: false,
          tabBarBadge: items.length,
          tabBarBadgeStyle: {
            backgroundColor: "#F05F7A",
            fontSize: 12,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size}></Ionicons>
          ),
        }}
        component={CartScreen}
      />
      <Tab.Screen
        name="Account"
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
