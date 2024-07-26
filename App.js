import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import Sepet from "./screens/Sepet";
import InspectProduct from "./screens/InspectProduct";
import KargoTakip from "./screens/KargoTakip";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sepet"
          component={Sepet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KargoTakip"
          component={KargoTakip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InspectProduct"
          component={InspectProduct}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
