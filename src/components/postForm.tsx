import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { db, auth } from "../firebase/Firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const PostForm = () => {
  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth);

  const handlePost = async () => {
    try {
      console.log("teste");
      await addDoc(collection(db, "posts"), {
        message: message,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: user.displayName,
      });
      console.log("message: ", message);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Mensagem"
        onChangeText={(text) => setMessage(text)}
      />
      <Button onPress={handlePost} title="Submit" />
    </View>
  );
};

export default PostForm;
