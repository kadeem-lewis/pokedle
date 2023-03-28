"use client";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
const pokemonSolid = localFont({
  src: "../public/fonts/pokemon-solid.ttf",
  variable: "--font-pokemon-solid",
});
const pokemonDs = localFont({
  src: "../public/fonts/pokemon-ds.ttf",
  variable: "--font-pokemon-ds",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pokemonDs.className}>
        <Providers>
          <div className=" max-w-sm mx-auto">
            <Navbar />
            <main className="pt-2">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
