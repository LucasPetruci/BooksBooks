import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase-config";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";
import { getAuthor } from "./getAuthor";
import { selectableList } from "./selectableList";

const PostBook = () => {
  const [author, setAuthor] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [pubDate, setPubDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAuthorId, setSelectAuthorId] = useState<Array<any>>([]);

  useEffect(() => {
    async function fetchAuthor() {
      const authorData = await getAuthor();
      if (authorData) {
        setAuthor(authorData);
      }
    }

    fetchAuthor();
  }, []);

  const handlePost = async () => {
    if (title === "" || summary === "" || selectedAuthorId.length === 0) {
      alert("Missing required fields");
      return;
    }

    try {
      console.log("teste");
      await addDoc(collection(db, "book"), {
        title: title,
        summary: summary,
        authorId: selectedAuthorId,
        pubDate: pubDate,
      });
      console.log("title: ", title);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Book Title: "
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder="Book Summary: "
          onChangeText={(text) => setSummary(text)}
        />
        <Text>Book author:</Text>

        {selectableList("name", author, selectedAuthorId, setSelectAuthorId)}

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text>{pubDate ? pubDate.toDateString() : "Select Date"}</Text>
        </TouchableOpacity>
        <Button onPress={handlePost} title="Submit" />
      </View>
    </SafeAreaView>
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
export default PostBook;
