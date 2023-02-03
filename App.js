import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigator from "./navigations/BottomTabNavigator";
import ProductScreen from "./screens/ProductScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import SearchScreen from "./screens/SearchScreen";

import store from "./store";
import { Provider } from "react-redux";
import { NativeWindStyleSheet } from "nativewind";
import CartScreen from "./screens/CartScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";

import { useFonts } from "expo-font";
import { useCallback } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Itim-Regular": require("./assets/fonts/Itim-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log("zaladowano");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Provider store={store}>
        <StatusBar
          style="light"
          backgroundColor="#222"
          translucent={false}
        ></StatusBar>

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="TabNavigation" component={BottomTabNavigator} />
          <Stack.Screen
            name="ProductsListScreen"
            component={ProductsListScreen}
          />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />

          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
          ></Stack.Screen>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
