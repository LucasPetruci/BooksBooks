import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase/Firebase-config";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export function Register() {
  const authen = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const db = getFirestore();
  const navigation = useNavigation();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        authen,
        email,
        password
      );
      console.log(response);
      alert("check email");

      const docRef = await addDoc(collection(db, "users"), {
        uid: response.user.uid,
        email: email.toLowerCase().trim(),
        name: name.trim(),
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate("Login");
    } catch (error: any) {
      console.log(error);
      alert("" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
      ></TextInput>
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
          <Button title="Register" onPress={() => signUp()}></Button>
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
