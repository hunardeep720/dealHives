"use client";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/utils/auth-context";
import { getItems, updateName, updateAddress,updateCity,updateCountry,updateLastName,updateMobileNumber,updatePinCode,updateState} from "@/service/store-service";

function Information() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [itemId, setItemId] = useState("");
  const [userId, setUserId] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [items, setItems] = useState([]);
  const { user, firebaseSignOut } = useUserAuth();

  async function handleSignOut() {
    await firebaseSignOut();
  }
  async function updateDataFunction(userId,itemid, data) {
    await updateData(userId,itemid, data);
  };
  const handleSubmit= (e) => {
    e.preventDefault();
    if (name.length > 0) {
      updateName(user.uid,userId, name);
    }
    if (lastName.length > 0) {
      updateLastName(user.uid,userId, lastName);
    }
    if (address.length > 0) {
      updateAddress(user.uid,itemId, address);
    }
    if (city.length > 0) {
      updateCity(user.uid,itemId, city);
    }
    if (country.length > 0) {
      updateCountry(user.uid,itemId, country);
    }
    if (mobileNumber.length > 0) {
      updateMobileNumber(user.uid,itemId, mobileNumber);
    }
    if (pincode.length > 0) {
      updatePinCode(user.uid,itemId, pincode);
    }
    if (state.length > 0) {
      updateState(user.uid,itemId, state);
    }
    setEdit(!edit);
    window.location.reload();
  }

  const EditHandler = () => {
    setEdit(!edit);
  };

  // const SaveHandler = () => {
  //   setEdit(!edit);
  // };

  useEffect(() => {
    const loadItems = async () => {
      try {
        if (user) {
          const userItems = await getItems(user.uid);
          setItems(userItems);
          console.log("Items loaded:", userItems);
          console.log(user.uid);
        } else {
          console.log("No user");
        }
      } catch (error) {
        console.error("Error loading items:", error);
      }
    };

    loadItems();
  }, [user]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 grid justify-center items-center bg-slate-50 text-center">
      <p className="font-extrabold text-4xl m-8">User Information</p>
      <div className={edit ? "hidden" : "border shadow-lg p-2 bg-white w-full m-4"}>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-5 m-5 text-center">
            {item.name && <div className="border p-1">{item.name}</div>}
            {item.lastName && <div className="border p-1">{item.lastName}</div>}
            {item.address && <div className="border p-1">{item.address}</div>}
            {item.city && <div className="border p-1">{item.city}</div>}
            {item.country && <div className="border p-1">{item.country}</div>}
            {item.mobileNumber && (
              <div className="border p-1">{item.mobileNumber}</div>
            )}
            {item.pincode && <div className="border p-1">{item.pincode}</div>}
            {item.state && <div className="border p-1">{item.state}</div>}
          </div>
        ))}
      </div>
      <div className={edit ? "border shadow-lg p-2 bg-white m-4 w-full" : "hidden"}>
        <form onSubmit={handleSubmit}>
          {items.map((item) => (
            <div className="grid grid-cols-2 gap-5 m-5 text-center">
              {item.name && (
                <input
                  placeholder={item.name}
                  onChange={(e) => {setName(e.target.value);setUserId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.lastName && (
                <input
                  placeholder={item.lastName}
                  onChange={(e) => {setLastName(e.target.value);setUserId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.address && (
                <input
                  placeholder={item.address}
                  onChange={(e) => {setAddress(e.target.value);setItemId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.city && (
                <input
                  placeholder={item.city}
                  onChange={(e) => {setCity(e.target.value);setItemId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.country && (
                <input
                  placeholder={item.country}
                  onChange={(e) => {setCountry(e.target.value);setItemId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.mobileNumber && (
                <input
                type="tel"
                  placeholder={item.mobileNumber}
                  maxLength={10}
                  onChange={(e) => {setMobileNumber(e.target.value);;setItemId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.pincode && (
                <input
                  placeholder={item.pincode}
                  maxLength={6}
                  onChange={(e) => {setPincode(e.target.value);setItemId(item.id);console.log(item.id)}}
                  className="border p-1 text-center"
                />
              )}
              {item.state && (
                <input
                  placeholder={item.state}
                  onChange={(e) => {setState(e.target.value);setItemId(item.id)}}
                  className="border p-1 text-center"
                />
              )}
            </div>
          ))}
          <button type="submit" className="p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 w-1/2 mt-5">
            Save
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full items-center">
        <button onClick={EditHandler} className={edit ? "hidden" : "p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 w-1/2 mt-5"}>
          Edit
        </button>
        <button
          className="p-1 text-white bg-black hover:bg-black/30 hover:text-slate-800 m-5 w-1/2"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Information;
