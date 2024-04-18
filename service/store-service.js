import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc } from "firebase/firestore";

export async function getItems(userId) {
    const q = query(
        collection(db, "users",userId, "userInformation"),
      );
      const querySnapshot = await getDocs(q);
  const userItems = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userItems;
}
  export async function addItem(userId, information) {
    const itemsCollectionRef = collection(db, "users", userId, "userInformation");
    return addDoc(itemsCollectionRef, information);
  }
  export async function addAddress(userId, address) {
    const itemsCollectionRef = collection(db, "users", userId, "userInformation");
    return addDoc(itemsCollectionRef, address);
  }
  export async function addProduct(userId, product) {
    const itemsCollectionRef = collection(db, "users", userId, "userInformation");
    return addDoc(itemsCollectionRef, product);
  }
  export async function deleteItem(userId, itemId) {
    const docRef = doc(db,'users', userId, 'userInformation', itemId);
    await deleteDoc(docRef);
  }