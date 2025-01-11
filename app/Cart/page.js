'use client'

import { useState, useEffect } from "react"
import { useUserAuth } from "@/utils/auth-context"
import { useRouter } from "next/navigation"
import { getUserCart } from "@/service/getServices/page"
import CartItemList from "@/components/cart-item-list"
import CartSummary from "@/components/cart-summary"
import CartPageSkeleton from "@/components/cart-page-skeleton"

export default function CartPage() {
  const [items, setItems] = useState(null)
  const { user } = useUserAuth()
  const router = useRouter()

  function fetchCartDetails() {
    getUserCart((data) => {
      setItems(data)
    }, user)
  }

  useEffect(() => {
    if (user) {
      fetchCartDetails()
    } else if (user === false) {
      router.push("/Account")
    }
  }, [user, router])

  if (!items) {
    return (
     <CartPageSkeleton />
    )
  }

  return (
    <div className="container mx-auto p-4 h-screen py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartItemList items={items} onItemsChange={setItems} />
        </div>
        <div className="md:col-span-1">
          <CartSummary items={items} />
        </div>
      </div>
    </div>
  )
}

