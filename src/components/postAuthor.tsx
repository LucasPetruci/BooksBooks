import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/Firebase-config";
import { Button, SafeAreaView, TextInput, View } from "react-native";

const PostAuthor = () => {
  const [name, setName] = useState<string>("");
  const [books, setBooks] = useState([]);

  const handlePost = async () => {
    try {
      console.log("teste");
      await addDoc(collection(db, "author"), {
        name: name,
        books: books,
      });
      console.log("name: ", name);
    } catch (e) {
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
