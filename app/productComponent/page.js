"use client";
import React, { useState } from "react";

function FilterComponent({
  selectedCountry,
  selectedSortBy,
  selectedProductCondition,
  selectedIsPrime,
  setSelectedCountry,
  setSelectedSortBy,
  setSelectedProductCondition,
  setSelectedIsPrime,
  setLoading,
}) {
  const [country, setCountry] = useState(selectedCountry);
  const [sortBy, setSortBy] = useState(selectedSortBy);
  const [productCondition, setProductCondition] = useState(
    selectedProductCondition
  );
  const [isPrime, setIsPrime] = useState(selectedIsPrime);

  const habdleReset = () => {
    setCountry(selectedCountry);
    setSortBy(selectedSortBy);
    setProductCondition(selectedProductCondition);
    setIsPrime(selectedIsPrime);
  };

  const handleSubmit = () => {
    if (
      country === "" ||
      sortBy === "" ||
      productCondition === "" ||
      isPrime === ""
    ) {
      alert("Please select all the fields");
    } else {
      setSelectedCountry(country);
      setSelectedSortBy(sortBy);
      setSelectedProductCondition(productCondition);
      setSelectedIsPrime(isPrime);
      setLoading(true);
    }
  };
  return (
    <div className="h-screen w-32 xl:w-96 bg-slate-100 p-2 gap-5 sm:flex sm:flex-col hidden">
        <div className="">
      <p className="text-xl font-bold">Filter the search</p>

      <div className="flex flex-col my-2">
        <label className="font-medium">Country</label>
        <div>
          <label>
            <input
              type="radio"
              name="country"
              value="CA"
              checked={country === "CA"}
              onChange={() => {
                setCountry("CA");
              }}
              className="cursor-pointer"
            />
            Canada
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="country"
              value="US"
              checked={country === "US"}
              onChange={() => {
                setCountry("US");
              }}
              className="cursor-pointer"
            />
            United States
          </label>
        </div>
      </div>

      <div className="flex flex-col my-2">
        <label className="font-medium">Sort By</label>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="RELEVANCE"
              checked={sortBy === "RELEVANCE"}
              onChange={() => {
                setSortBy("RELEVANCE");
              }}
              className="cursor-pointer"
            />
            Relevance
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="LOWEST_PRICE"
              checked={sortBy === "LOWEST_PRICE"}
              onChange={() => {
                setSortBy("LOWEST_PRICE");
              }}
              className="cursor-pointer"
            />
            Price Low to High
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="HIGEST_PRICE"
              checked={sortBy === "HIGEST_PRICE"}
              onChange={() => {
                setSortBy("HIGEST_PRICE");
              }}
              className="cursor-pointer"
            />
            Price High to Low
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="NEWEST"
              checked={sortBy === "NEWEST"}
              onChange={() => {
                setSortBy("NEWEST");
              }}
              className="cursor-pointer"
            />
            Newest
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="REVIEWS"
              checked={sortBy === "REVIEWS"}
              onChange={() => {
                setSortBy("REVIEWS");
              }}
              className="cursor-pointer"
            />
            Reviews
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="BEST_SELLER"
              checked={sortBy === "BEST_SELLER"}
              onChange={() => {
                setSortBy("BEST_SELLER");
              }}
              className="cursor-pointer"
            />
            Best Seller
          </label>
        </div>
      </div>

      <div className="flex flex-col my-2">
        <label className="font-medium">Product Condition</label>
        <div>
          <label>
            <input
              type="radio"
              name="productCondition"
              value="ALL"
              checked={productCondition === "ALL"}
              onChange={() => {
                setProductCondition("ALL");
              }}
              className="cursor-pointer"
            />
            All
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="productCondition"
              value="NEW"
              checked={productCondition === "NEW"}
              onChange={() => {
                setProductCondition("NEW");
              }}
              className="cursor-pointer"
            />
            New
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="productCondition"
              value="USED"
              checked={productCondition === "USED"}
              onChange={() => {
                setProductCondition("USED");
              }}
              className="cursor-pointer"
            />
            Used
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="productCondition"
              value="RENEWED"
              checked={productCondition === "RENEWED"}
              onChange={() => {
                setProductCondition("RENEWED");
              }}
              className="cursor-pointer"
            />
            Renewed
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="productCondition"
              value="COLLECTIBLE"
              checked={productCondition === "COLLECTIBLE"}
              onChange={() => {
                setProductCondition("COLLECTIBLE");
              }}
              className="cursor-pointer"
            />
            Collectible
          </label>
        </div>
      </div>

      <div className="flex flex-col my-2">
        <label className="font-medium">Is Prime</label>
        <div>
          <label>
            <input
              type="radio"
              name="isPrime"
              value="false"
              checked={isPrime === "false"}
              onChange={() => {
                setIsPrime("false");
              }}
              className="cursor-pointer"
            />
            No
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="isPrime"
              value="true"
              checked={isPrime === "true"}
              onChange={() => {
                setIsPrime("true");
              }}
              className="cursor-pointer"
            />
            Yes
          </label>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 rounded-md hover:bg-slate-500"
        >
          Filter
        </button>
        <button
          onClick={habdleReset}
          className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-300"
        >
          Reset
        </button>
      </div></div>
    </div>
  );
}

export default FilterComponent;
