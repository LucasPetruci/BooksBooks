import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { authorPublicDTO, authorInternalDTO } from "../dto/authorDTO";
import { statusDTO } from "../dto/statusDTO";

//OK
export async function getAllAuthors(): Promise<Array<authorPublicDTO> | null> {
  const db = getFirestore();
  const authorRef = collection(db, "/author");
  const authorSnapshot = await getDocs(authorRef);
  if (!authorSnapshot.empty) {
    const authorList = authorSnapshot.docs.map(
      (doc) =>
        ({name: doc.data().name} as authorPublicDTO)
    );
    return authorList;
  }
  return null;
}
//OK
export async function getAuthorById(id: string): Promise<authorPublicDTO | null> {
  const db = getFirestore();
  const authorRef = doc(db, "/author/" + id );
  const authorSnapshot = await getDoc(authorRef);

  if (authorSnapshot.exists()) {
    const data = authorSnapshot.data();
    return {name: data.name} as authorPublicDTO;
  }
  return null;
}
//OK
export async function getAuthorByName(name: string): Promise<authorInternalDTO | null> {
  const db = getFirestore();
  const authorRef = collection(db, "/author");
  const authorSnapshot = await getDocs(authorRef);
  const wanted = authorSnapshot.docs.find(currAuthor => currAuthor.data().name === name)
  if (wanted){
    return {
      id: wanted.id,
      name: wanted.data().name
    };
  }
  return null;
}
//OK
export async function createAuthor(name): Promise<authorPublicDTO | null> {
  const db = getFirestore();
  const authorRef = collection(db, "/author");
  const data = { name: name };
  //TODO - adicionar confirmação se o banco registrou
  await addDoc(authorRef, data);
  return {
    name: data.name,
  };
}

//TODO - testar essa função, TDD type
export async function updateAuthor(id: string, newName: string): Promise<statusDTO | null>{
  const db = getFirestore();
  const authorRef = doc(db, "/author/"+id);
  await updateDoc(authorRef, {name: newName});
  return { status: 200, message: "Author updated"};
}

//TODO - testar essa função, TDD type
export async function removeAuthor() {

}