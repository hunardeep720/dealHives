import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

export async function addUserInformation(user, data) {
    try {
      const docRef = doc(db, "users", user); // Create a reference to the document
      await setDoc(docRef, data); // Use setDoc to set the document with the provided data
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
