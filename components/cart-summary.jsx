"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CartSummary({ items }) {
  const [total, setTotal] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [expectedDate, setExpectedDate] = useState(new Date())

  useEffect(() => {
    let newTotal = 0
    items.forEach((item) => {
      const numberValue = parseFloat(item.price.replace(/,/g, ""))
      newTotal += numberValue * parseFloat(item.amount)
    })
    setTotal(parseFloat(newTotal.toFixed(2)))

    const date = new Date()
    let dateAfterThreeDays = new Date()
    dateAfterThreeDays.setDate(date.getDate() + 3)
    setExpectedDate(dateAfterThreeDays)
  }, [items])

  useEffect(() => {
    setTotalAmount((total + total * 0.05).toFixed(2))
  }, [total])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>${(total * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
          <div className="text-sm text-gray-500">
            Expected Delivery: {expectedDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/BuyProduct" className="w-full">
          <Button className="w-full">Proceed to Checkout</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

