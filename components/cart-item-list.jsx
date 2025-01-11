"use client";
import { useState } from "react"
import Image from "next/image"
import { useUserAuth } from "@/utils/auth-context"
import { deleteFromCart } from "@/service/postServices/page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

export default function CartItemList({ items, onItemsChange }) {
  const { user } = useUserAuth()
  const [message, setMessage] = useState("")

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteFromCart(user, itemId)
      setMessage("Item removed successfully")
      onItemsChange(items.filter(item => item.id !== itemId))
    } catch (error) {
      setMessage("Failed to remove item")
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.title.slice(0, 50)}...</h3>
                <p className="text-sm text-gray-500">Quantity: {item.amount}</p>
                <p className="font-bold">
                  ${(parseFloat(item.price.replace(/,/g, "")) * item.amount).toFixed(2)}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {message && (
        <p className="text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  )
}

