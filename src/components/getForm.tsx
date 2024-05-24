import { Text, View, StyleSheet } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export function GetForm() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const db = getFirestore();
      const postRef = collection(db, "/posts");
      try {
        const postSnapshot = await getDocs(postRef);
        const postList = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPosts(postList);
      } catch (e) {
        console.error("Error getting post: ", e);
        return null;
      }
    }
    fetchPost();
  }, []);

  if (!posts) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {posts.map((post) => (
        <Text key={post.id} style={styles.post}>
          {post.data.message} {post.data.userName}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: "blue",
    padding: 10,
  },
});
