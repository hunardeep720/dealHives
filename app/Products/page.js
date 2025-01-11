'use client'

import { useState, useEffect, useContext } from "react"
import { useSearchParams } from "next/navigation"
import { GlobalStateContext } from "@/app/GlobalStateVariable"
import ProductGrid from "@/components/product-grid"
import FilterSidebar from "@/components/filter-sidebar"
import MobileFilterDrawer from "@/components/mobile-filter-drawer"
import Pagination from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter } from 'lucide-react'

export default function ProductListingPage() {
  const [open, setOpen] = useContext(GlobalStateContext)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const searchParams = useSearchParams()

  const urlReaded = searchParams.get("url") || ""
  const itemName = searchParams.get("name") || ""
  const [productName, setProductName] = useState(itemName)
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"))
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "CA")
  const [selectedSortBy, setSelectedSortBy] = useState(searchParams.get("sort_by") || "RELEVANCE")
  const [selectedProductCondition, setSelectedProductCondition] = useState(searchParams.get("product_condition") || "ALL")
  const [selectedIsPrime, setSelectedIsPrime] = useState(searchParams.get("is_prime") === "true")

  const [productsList, setProductsList] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const url = `https://real-time-amazon-data.p.rapidapi.com/${urlReaded}&page=${page}&country=${selectedCountry}&sort_by=${selectedSortBy}&product_condition=${selectedProductCondition}&is_prime=${selectedIsPrime}`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    }

    try {
      setLoading(true)
      const response = await fetch(url, options)
      const result = await response.json()
      setProductsList(result.data.products)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (urlReaded) {
      fetchData()
    }
    
  }, [urlReaded, page, selectedCountry, selectedSortBy, selectedProductCondition, selectedIsPrime])

  return (
    <div className={`container mx-auto p-4 ${open ? "opacity-40" : ""} transition-opacity duration-500 my-16`}>
      <h1 className="text-3xl font-bold mb-6">Search Results for "{productName}"</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          selectedCountry={selectedCountry}
          selectedSortBy={selectedSortBy}
          selectedProductCondition={selectedProductCondition}
          selectedIsPrime={selectedIsPrime}
          setSelectedCountry={setSelectedCountry}
          setSelectedSortBy={setSelectedSortBy}
          setSelectedProductCondition={setSelectedProductCondition}
          setSelectedIsPrime={setSelectedIsPrime}
          setLoading={setLoading}
          visibility="hidden md:block"
        />
        <div className="flex-1">
          <div className="md:hidden mb-4">
            <Button onClick={() => setFilterDrawerOpen(true)} variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
          <ProductGrid products={productsList} loading={loading} selectedCountry={selectedCountry} />
          <Pagination
            currentPage={page}
            setPage={setPage}
            hasNextPage={productsList.length > 0 && page < 6}
            hasPrevPage={page > 1}
          />
        </div>
      </div>
      <MobileFilterDrawer
        open={filterDrawerOpen}
        setOpen={setFilterDrawerOpen}
        selectedCountry={selectedCountry}
        selectedSortBy={selectedSortBy}
        selectedProductCondition={selectedProductCondition}
        selectedIsPrime={selectedIsPrime}
        setSelectedCountry={setSelectedCountry}
        setSelectedSortBy={setSelectedSortBy}
        setSelectedProductCondition={setSelectedProductCondition}
        setSelectedIsPrime={setSelectedIsPrime}
        setLoading={setLoading}
        visibility="md:hidden"
      />
    </div>
  )
}

