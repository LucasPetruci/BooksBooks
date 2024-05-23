import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { db, auth } from "../firebase/Firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {} from "./postBook";
import { selectableList } from "./selectableList";
import { getBook } from "./getBook";
import { getUserData } from "../pages/ProfileScreen";

const PostForm = () => {
  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState(null);
  const [selectedBookId, setSelectBookId] = useState<Array<any>>([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function fetchBook() {
      const booksData = await getBook();
      if (booksData) {
        setBook(booksData);
      }
    }
    async function fetchUserName() {
      const userData = await getUserData();
      if (userData) {
        setUserName(userData["name"]);
      }
    }
    fetchBook();
    fetchUserName();
  }, []);

  const handlePost = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        message: message,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: userName,
        bookId: selectedBookId,
      });
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
      <Text>Book: </Text>

      {selectableList("title", book, selectedBookId, setSelectBookId)}

      <Button onPress={handlePost} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  selectedAuthor: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "#000000aa",
  },
});

export default PostForm;
