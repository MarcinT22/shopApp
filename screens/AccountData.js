import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isSignedIn, logout, getUserData } from "../features/userSlice";
import { useNavigation } from "@react-navigation/native";

export default function AccountData() {
  const navigation = useNavigation();
  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      await dispatch(logout());
      navigation.navigate("Account");
    } catch (error) {}
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4 justify-between pb-20">
      <ScrollView>
        <View className="py-2">
          {user.name ? (
            <View>
              <Text className="text-2xl font-bold color-black">
                Witaj <Text className="capitalize">{user.name.firstname}</Text>!
              </Text>
            </View>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => logoutUser()}
          className="mt-4 p-4  bg-blue-300 rounded-lg"
        >
          <Text className="color-white font-bold text-base text-center">
            Wyloguj
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
