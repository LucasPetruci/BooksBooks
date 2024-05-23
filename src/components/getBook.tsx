import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function getBook() {
  const db = getFirestore();
  const bookRef = collection(db, "/book");
  try {
    const bookSnapshot = await getDocs(bookRef);
    const bookList = bookSnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return bookList;
  } catch (e) {
    console.error("Error getting book: ", e);
    return null;
  }
}
