import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function getAuthors() {
  const db = getFirestore();
  const authorsRef = collection(db, "/author");
  try {
    const authorsSnapshot = await getDocs(authorsRef);
    const authorsList = authorsSnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return authorsList;
  } catch (e) {
    console.error("Error getting authors: ", e);
    return null;
  }
}
