import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "./home/Login";
import { Profile } from "./profile/Profile";
import { View, Text } from "react-native";
import React from "react";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator initialRouteName="For You">
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></Tab.Screen>

      <Tab.Screen name="For You" component={Profile}></Tab.Screen>
      <Tab.Screen name="Following" component={Profile}></Tab.Screen>
      <Tab.Screen name="Create" component={Profile}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
}
