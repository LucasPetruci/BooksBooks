import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "./LoginScreen";
import { Profile } from "./ProfileScreen";
import { View, Text } from "react-native";
import React from "react";
import { withAuthentication } from "../components/withAuthentication";

import { Post } from "./PostScreen";
import { ForYou } from "./ForYouScreen";

const Tab = createBottomTabNavigator();

const AuthenticatedProfile = withAuthentication(Profile);
const AuthenticatedPost = withAuthentication(Post);

export function Routes() {
  return (
    <Tab.Navigator initialRouteName="Foryou">
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></Tab.Screen>

      <Tab.Screen name="Foryou" component={ForYou}></Tab.Screen>

      <Tab.Screen
        name="Following"
        component={AuthenticatedProfile}
      ></Tab.Screen>

      <Tab.Screen name="Post" component={AuthenticatedPost}></Tab.Screen>

      <Tab.Screen name="Profile" component={AuthenticatedProfile}></Tab.Screen>
    </Tab.Navigator>
  );
}
