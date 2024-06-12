import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authen = auth;
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        authen,
        email,
        password
      );
      navigation.navigate("Foryou");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>

      {loading ? (
        <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
      ) : (
        <>
          <Button title="Login" onPress={() => signIn()}></Button>
          <Pressable
            onPress={() => navigation.navigate("Login", { screen: "Register" })}
          >
            <Text>Register</Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    justifyContent: "center",
  },

  input: {
    borderColor: "black",
  },
});
