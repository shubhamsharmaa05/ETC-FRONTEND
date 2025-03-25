import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingBag, User, Search, Menu } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ETCETRA - Premium Oversized Clothing",
  description: "Shop premium oversized t-shirts and apparel at ETCETRA",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-6 lg:gap-10">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                      <nav className="grid gap-6 text-lg font-medium">
                        <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-50">
                          Home
                        </Link>
                        <Link href="/products" className="hover:text-slate-900 dark:hover:text-slate-50">
                          Products
                        </Link>
                        <Link href="/about" className="hover:text-slate-900 dark:hover:text-slate-50">
                          About
                        </Link>
                        <Link href="/contact" className="hover:text-slate-900 dark:hover:text-slate-50">
                          Contact
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold">ETCETRA</span>
                  </Link>
                  <nav className="hidden lg:flex gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-slate-900 dark:hover:text-slate-50">
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className="text-sm font-medium hover:text-slate-900 dark:hover:text-slate-50"
                    >
                      Products
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-slate-900 dark:hover:text-slate-50">
                      About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-slate-900 dark:hover:text-slate-50">
                      Contact
                    </Link>
                  </nav>
                </div>
                <div className="hidden md:flex md:flex-1 items-center justify-end">
                  <div className="relative mr-4 w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <Link href="/cart">
                    <Button variant="ghost" size="icon">
                      <ShoppingBag className="h-6 w-6" />
                      <span className="sr-only">Cart</span>
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="ghost" size="icon">
                      <User className="h-6 w-6" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <div className="container py-8 md:py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Shop</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/products"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          All Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Oversized Tees
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Best Sellers
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Company</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/about"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/terms"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/privacy"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Account</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/login"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/orders"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Order History
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Customer Care</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/faq"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shipping"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Shipping Info
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/returns"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Returns & Exchanges
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/size-guide"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                          Size Guide
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      © {new Date().getFullYear()} ETCETRA. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="#"
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

