import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductGrid({ products, loading, selectedCountry }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return <p className="text-center text-lg font-semibold">No products found</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.asin}
          href={{
            pathname: "/ProductDescription",
            query: {
              asin: product.asin,
              name: product.product_title,
              country: selectedCountry,
            },
          }}
          as={`/ProductDescription?asin=${product.asin}&name=${encodeURIComponent(product.product_title)}&country=${encodeURIComponent(selectedCountry)}`}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <Image
                  src={product.product_photo}
                  alt={product.product_title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.product_title}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="text-lg font-bold">{product.product_price}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

