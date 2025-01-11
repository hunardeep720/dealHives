"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MdSportsEsports } from "react-icons/md"
import { FaBaby } from "react-icons/fa6"
import { GiBookshelf } from "react-icons/gi"
import { PiTelevisionFill } from "react-icons/pi"
import { GiWashingMachine } from "react-icons/gi"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Electronics", icon: GiWashingMachine, query: "electronics" },
  { name: "Movies", icon: PiTelevisionFill, query: "movies" },
  { name: "Sport", icon: MdSportsEsports, query: "sports" },
  { name: "Kids", icon: FaBaby, query: "kids" },
  { name: "Comics", icon: GiBookshelf, query: "comics" },
]

function ExploreCategories() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={{
              pathname: "/Products",
              query: { url: `search?query=${category.query}` },
            }}
            as={`/Products?url=search?query=${category.query}&page=1&country=CA&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`}
            passHref
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon size={60} className="text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-center">{category.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ExploreCategories

