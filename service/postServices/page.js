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

  export async function updateUserData(user,data){
    try{
      const docRef = doc(db, "users", user);
      await updateDoc(docRef, data);
      console.log("Document updated with ID: ", docRef.id);
    }catch(e){
      console.error("Error updating document: ", e);
    }
  }
  
  export async function addProductsToCart(user,date){
    try{
      const docRef = collection(db, "users", user,"cart");
      await addDoc(docRef, date);
      console.log("Document written with ID: ", docRef.id);
    }catch(e){
      console.error("Error adding document: ", e);
    }
  }

  export async function deleteFromCart(user,id){
    try{
      const docRef = doc(db, "users", user,"cart",id);
      await deleteDoc(docRef);
      console.log("Document deleted with ID: ", docRef.id);
    }catch(e){
      console.error("Error deleting document: ", e);
    }
  }