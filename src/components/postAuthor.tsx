import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/Firebase-config";
import { Button, SafeAreaView, TextInput, View } from "react-native";
import { createAuthor } from "../services/authorServices";

const PostAuthor = () => {
  const [name, setName] = useState<string>("");

  const handlePost = async () => {
    try{
      createAuthor(name)
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }

  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Author name: "
          onChangeText={(text) => setName(text)}
        />
        <Button onPress={handlePost} title="Submit" />
      </View>
    </SafeAreaView>
  );
};

export default PostAuthor;
