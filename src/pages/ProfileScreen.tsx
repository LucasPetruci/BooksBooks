import { View, Text, SafeAreaView, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase-config";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "./routes";
import { collection, query, where, getDocs } from "firebase/firestore";
import { withAuthentication } from "../components/withAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { Login } from "./LoginScreen";
import UploadImage from "../components/uploadImage";

export const getUserData = async () => {
  const q = query(
    collection(db, "users"),
    where("uid", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  let userData;
  querySnapshot.forEach((doc) => {
    userData = doc.data();
    console.log(userData["name"]);
  });
  return userData;
};

export function Profile() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Profile screen mounted");
    getUserData().then((data) => setUserData(data));

    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsub();
  }, []);

  const logout = () => {
    auth.signOut().then((response) => {
      Alert.alert("Logout", "You have been logged out");
      navigation.navigate("Foryou");
    });
  };
  return (
    <SafeAreaView>
      <Text> {userData ? userData["name"] : "Loading..."} </Text>
      {isAuthenticated ? (
        <>
          <UploadImage />
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      )}
    </SafeAreaView>
  );
}
