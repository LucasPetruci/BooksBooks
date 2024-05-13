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
import { getAuthors } from "./getAuthor";

const PostBook = () => {
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [pubDate, setPubDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAuthorsId, setSelectAuthorsId] = useState([]);

  useEffect(() => {
    async function fetchAuthors() {
      const authorsData = await getAuthors();
      if (authorsData) {
        setAuthors(authorsData);
      }
    }

    fetchAuthors();
  }, []);

  function handleAuthorListPress(newAuthorId: any, element: any) {
    if (selectedAuthorsId.includes(newAuthorId)) {
      setSelectAuthorsId(
        selectedAuthorsId.filter((author) => author !== newAuthorId)
      );
      console.log(selectedAuthorsId);
    } else {
      setSelectAuthorsId((xxx: Array<any>) => [...xxx, newAuthorId]);
      element.style = styles.selectedAuthor;
      console.log(selectedAuthorsId);
    }
  }

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
        <Text>Book author:</Text>
        {selectedAuthorsId.map((author) => {
          return author.name;
        })}
        <FlatList
          data={authors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.author,
                selectedAuthorsId.includes(item.id)
                  ? styles.selectedAuthor
                  : {},
              ]}
              onPress={(e) => {
                handleAuthorListPress(item.id, e.target);
              }}
            >
              <Text>{item.data.name}</Text>
            </Pressable>
          )}
        />
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
