import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "../views/LoginScreen";
import { Profile } from "../views/ProfileScreen";
import { View, Text } from "react-native";
import React, { useState } from "react";
import { withAuthentication } from "../components/withAuthentication";
import { AuthorCreation } from "../views/AuthorCreationScreen";
import { BookCreation } from "../views/BookCreationScreen";

import { Post } from "../views/PostScreen";
import { ForYou } from "../views/ForYouScreen";
import { Register } from "../views/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthenticatedProfile = withAuthentication(Profile);
const AuthenticatedPost = withAuthentication(Post);
const AuthenticatedAuthorCreation = withAuthentication(AuthorCreation);
const AuthenticatedBookCreation = withAuthentication(BookCreation);

export function Login_Register() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
}

export function Routes() {
  return (
    <Tab.Navigator initialRouteName="Foryou">
      <Tab.Screen name="Foryou" component={ForYou}></Tab.Screen>

      <Tab.Screen
        name="Following"
        component={AuthenticatedProfile}
      ></Tab.Screen>

      <Tab.Screen name="Post" component={AuthenticatedPost}></Tab.Screen>

      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>

      <Tab.Screen
        name="AuthorCreation"
        component={AuthenticatedAuthorCreation}
      ></Tab.Screen>

      <Tab.Screen
        name="BookCreation"
        component={AuthenticatedBookCreation}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
