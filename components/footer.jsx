'use client'

import Link from "next/link"
import { useState, useContext } from "react"
import { GlobalStateContext } from "@/app/GlobalStateVariable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [open] = useContext(GlobalStateContext)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail("")
    setMessage("Thank you for subscribing!")
  }

  return (
    <footer className="w-full shadow-inner">
      <div
        className={`container grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 py-8 max-w-screen-2xl mx-auto transition-opacity duration-500 ease-in ${
          open ? "opacity-40" : "opacity-100"
        }`}
      >
        <div className="col-span-2 space-y-4 text-black">
          <h2 className="font-extrabold text-4xl">XYZ</h2>
          <h3 className="font-bold">Subscribe for more offers</h3>
          <form onSubmit={(e)=>handleSubmit(e)} className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </div>
            {message && <p className="text-sm text-blue-400">{message}</p>}
          </form>
        </div>
        <nav className="space-y-4 text-black">
          <h3 className="font-bold text-2xl">About Us</h3>
          <ul className="space-y-2">
            {[
              { href: "./CustomerHelp/#companyOverview", label: "Company Overview" },
              { href: "./CustomerHelp/#customerCommitment", label: "Customer Commitment" },
              { href: "./CustomerHelp/#serviceQualityAndValues", label: "Service Quality And Values" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="font-semibold hover:text-slate-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="space-y-4 text-black">
          <h3 className="font-bold text-2xl">Need Help</h3>
          <ul className="space-y-2">
            {[
              { href: "./CustomerHelp/#contactInformation", label: "Contact Information" },
              { href: "./CustomerHelp/#feedbackAndSuggestions", label: "Feedback and Suggestions" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="font-semibold hover:text-slate-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

