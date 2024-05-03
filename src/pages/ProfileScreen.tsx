import { View, Text, SafeAreaView, Button, Alert } from "react-native";
import React from "react";
import { auth } from "../firebase/Firebase-config";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "./routes";

export function Profile() {
  const navigation = useNavigation();

  const logout = () => {
    auth.signOut().then((response) => {
      Alert.alert("Logout", "You have been logged out");
      navigation.navigate("Foryou");
    });
  };

  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
