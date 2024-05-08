import React, { useState } from "react";
import { db } from "../firebase/Firebase-config";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection } from "firebase/firestore";

const PostBook = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [pubDate, setPubDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePost = async () => {
    if (title === "" || summary === "" || authorId === "") {
      console.error("Missing required fields");
      return;
    }

    try {
      console.log("teste");
      await addDoc(collection(db, "book"), {
        title: title,
        summary: summary,
        authorId: authorId,
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
        <TextInput
          placeholder="Author name: "
          onChangeText={(text) => setAuthorId(text)}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text>{pubDate ? pubDate.toDateString() : "Select Date"}</Text>
        </TouchableOpacity>
        <Button onPress={handlePost} title="Submit" />
      </View>
    </SafeAreaView>
  );
};

export default PostBook;
