import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GlobalStateProvider } from "./GlobalStateVariable";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "XYZ",
  description: "Create a website for online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <main>
          <GlobalStateProvider>
            <Navbar />
          {children}
          </GlobalStateProvider>
          
        </main>
      </body>
    </html>
  );
}
