"use client";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/utils/auth-context";
import { getUserData } from "@/service/getServices/page";
import { formatPhoneNumber, formatPostalCode } from "./formated";
import { updateUserData } from "@/service/postServices/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Information() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [items, setItems] = useState(null);
  const { user, firebaseSignOut } = useUserAuth();

  async function handleSignOut() {
    await firebaseSignOut();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: name,
      lastName: lastName,
      email: items.email,
      phone: mobileNumber,
      address: `${streetNumber} ${unitNumber}`,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };
    await updateUserData(user, data).then(() => {
      alert("User Information Updated");
    });
  };

  function loadItems() {
    getUserData((data) => {
      console.log("information data: ", data);
      if (data) {
        setItems(data);
      }
    }, user);
  }

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  useEffect(() => {
    console.log("items: ", items);
    if (items) {
      setName(items.firstName);
      setLastName(items.lastName);
      setStreetNumber(items.address.split(" ")[0]);
      setUnitNumber(items.address.split(" ")[1]);
      setCity(items.city);
      setCountry(items.country);
      setMobileNumber(items.phone);
      setPincode(items.pincode);
      setState(items.state);
    }
  }, [items]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Information</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>

      {items && items !== null ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={items.email}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(formatPhoneNumber(e.target.value))
                    }
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="streetNumber">Street Number</Label>
                  <Input
                    id="streetNumber"
                    value={streetNumber}
                    onChange={(e) => setStreetNumber(e.target.value)}
                    placeholder="Street Number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitNumber">Unit Number</Label>
                  <Input
                    id="unitNumber"
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    placeholder="Unit Number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Province</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Province"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pin Code</Label>
                  <Input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(formatPostalCode(e.target.value))}
                    placeholder="Pin Code"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-2xl font-semibold text-gray-500 animate-pulse">
              Loading...
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Information;

