import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShoppingBag, UserCircle } from "lucide-react";

export default function ProductBuy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Purchase Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
          <p className="text-xl">
            We're sorry, but the purchase option is currently unavailable.
          </p>
          <p className="text-lg text-muted-foreground">
            We'll notify you as soon as it becomes available. Thank you for your
            patience!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full" variant="default">
              <ShoppingBag className="mr-2 h-4 w-4" /> See More Options
            </Button>
          </Link>
          <Link href="/Account" className="w-full sm:w-auto">
            <Button className="w-full" variant="outline">
              <UserCircle className="mr-2 h-4 w-4" /> View Account Information
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
