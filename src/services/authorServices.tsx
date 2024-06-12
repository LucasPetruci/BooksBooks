import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { authorPublicDTO, authorInternalDTO } from "../dto/authorDTO";
import { statusDTO } from "../dto/statusDTO";

//TODO - Testar funçoes de authorServices no getForm.tsx
export async function getAll(): Promise<Array<authorPublicDTO> | null> {
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

export async function getById(id: string): Promise<authorPublicDTO | null> {
  const db = getFirestore();
  const authorRef = collection(db, "/author/" + id);
  const authorSnapshot = await getDocs(authorRef);

  if (!authorSnapshot.empty) {
    return {name: authorSnapshot.docs[0].data().name} as authorPublicDTO;
  }
  return null;
}
export async function getByName(name: string): Promise<authorInternalDTO | null> {
  const db = getFirestore();
  const authorRef = collection(db, "/author");
  const authorSnapshot = await getDocs(authorRef);
  authorSnapshot.docs.forEach(currAuthor => {
    if (currAuthor.data().name === name){
      return {
        id:currAuthor.id,
        name: currAuthor.id
      };
    }
  });
  return null;
}

export async function create(name): Promise<authorPublicDTO | null> {
  const db = getFirestore();
  const authorRef = collection(db, "/author");
  const data = { name: name };
  //TODO - adicionar confirmação se o banco registrou
  await addDoc(authorRef, data);
  return {
    name: data.name,
  };
}
export async function update(id: string, newName: string): Promise<statusDTO | null>{
  const db = getFirestore();
  const authorRef = doc(db, "/author/"+id);
  await updateDoc(authorRef, {name: newName});
  return { status: 200, message: "Author updated"};
}
export async function remove() {

}