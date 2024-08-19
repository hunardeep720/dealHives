import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";

export function getUserData(onChange, user) {
  try {
    const docRef = doc(db, "users", user); // Reference to the specific user document
    onSnapshot(docRef, (doc) => {
      const data = { id: doc.id, ...doc.data() };
      onChange(data);
    });
  } catch (error) {
    console.error("Error getting information: ", error);
    onChange(null);
  }
}

export function getUserInformation(onChange, user) {
  try {
    const docRef = doc(db, "users", user); // Reference to the specific user document
    onSnapshot(docRef, (doc) => {
      const data = { id: doc.id, ...doc.data() };
      onChange(data);
    });
  } catch (error) {
    console.error("Error getting information: ", error);
    onChange(null);
  }
}

export function getUserCart(onChange, user) {
  try {
    const docRef = query(collection(db, "users", user, "cart"),orderBy("orderAt","desc")); // Reference to the specific user cart
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      onChange(data);
    });
  } catch (e) {
    console.error("Error getting cart: ", e);
    onChange(null);
  }
}
