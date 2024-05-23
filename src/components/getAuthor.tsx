import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function getAuthor() {
  const db = getFirestore();
  const authorRef = collection(db, "/author");
  try {
    const authorSnapshot = await getDocs(authorRef);
    const authorList = authorSnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return authorList;
  } catch (e) {
    console.error("Error getting author: ", e);
    return null;
  }
}
