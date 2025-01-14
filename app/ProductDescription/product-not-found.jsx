import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import SimilarProducts from "@/components/SimilarProducts"

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 my-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Product Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-16 h-16 text-yellow-500" />
            <p className="text-lg text-center">
              We're sorry, but we couldn't find any details for this product.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">You might also like</h2>
        <SimilarProducts name="popular products" />
      </div> */}
    </div>
  )
}

