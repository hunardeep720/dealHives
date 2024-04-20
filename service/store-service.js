import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
  export async function updateName(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {name:data});
  }
  export async function updateLastName(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {lastName:data});
  }
  export async function updateAddress(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {address:data});
  }
  export async function updateCountry(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {country:data});
  }
  export async function updateMobileNumber(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {mobileNumber:data});
  }
  export async function updatePinCode(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {pincode:data});
  }
  export async function updateCity(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {city:data});
  }
  export async function updateState(userId, itemId, data) {
    const docRef = doc(db, 'users', userId, 'userInformation', itemId);
    await updateDoc(docRef, {state:data});
  }
  export async function deleteItem(userId, itemId) {
    const docRef = doc(db,'users', userId, 'userInformation', itemId);
    await deleteDoc(docRef);
  }