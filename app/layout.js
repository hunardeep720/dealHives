import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GlobalStateProvider } from "./GlobalStateVariable";
import { AuthContextProvider } from "@/utils/auth-context";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "dealhives.com",
  description: "Create a website for online store",
};

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="space-y-4 p-6">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="flex flex-col items-center space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    ))}
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <GlobalStateProvider>
            <div className="flex flex-col min-h-screen">
              <main>
                <Navbar />
                {/* Suspense Wrapper with Skeleton Fallback */}
                <Suspense fallback={<SkeletonLoader />}>{children}</Suspense>
              </main>
            </div>
            <Footer />
          </GlobalStateProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
