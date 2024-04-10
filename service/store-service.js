import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc } from "firebase/firestore";

export async function getItems(userId) {
    const q = query(
        collection(db, "users",userId, "items"),
      );
      const querySnapshot = await getDocs(q);
  const userItems = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userItems;
}
  export async function addItem(user, information) {
    const itemsCollectionRef = collection(db, "users", user, "userInformation");
    return addDoc(itemsCollectionRef, information);
  }
  export async function deleteItem(userId, itemId) {
    const docRef = doc(db,'users', userId, 'items', itemId);
    await deleteDoc(docRef);
    alert('Item deleted \nPlease refresh the page to see the changes')
  }