import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, TruckIcon, Clock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium mb-2">
                Premium Clothing
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">ETCETRA</h1>
                <p className="max-w-[600px] text-slate-500 dark:text-slate-400 md:text-xl">
                  Elevate your style with our premium oversized t-shirts. More clothing lines coming soon.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="gap-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Shop Collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-slate-200 dark:border-slate-800">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative mx-auto aspect-square overflow-hidden rounded-xl sm:w-full">
              <Image
                alt="ETCETRA Oversized Tee"
                className="object-cover"
                fill
                src="/placeholder.svg?height=800&width=800"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4">
                <TruckIcon className="h-6 w-6 text-slate-900 dark:text-slate-50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Free Shipping</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  On all orders over $50. International shipping available.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4">
                <Clock className="h-6 w-6 text-slate-900 dark:text-slate-50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Easy Returns</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  30-day return policy. Hassle-free returns and exchanges.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4">
                <ShieldCheck className="h-6 w-6 text-slate-900 dark:text-slate-50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure Checkout</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  100% secure payment processing. Your data is protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Collection</h2>
              <p className="max-w-[900px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most popular oversized t-shirts, designed for comfort and style.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <Card className="h-full overflow-hidden rounded-xl border-0 shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-200 dark:border-slate-800 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-slate-50 dark:group-hover:text-slate-900 transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-slate-200 dark:border-slate-800">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
              <p className="max-w-[900px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Subscribe to our newsletter for exclusive offers and updates on new releases.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                By subscribing, you agree to our terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative mx-auto aspect-square overflow-hidden rounded-xl sm:w-full">
              <Image
                alt="Coming Soon Collection"
                className="object-cover"
                fill
                src="/placeholder.svg?height=800&width=800"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 rounded-xl"></div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium mb-2">
                Coming Soon
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">New Collections Dropping Soon</h2>
                <p className="max-w-[600px] text-slate-500 dark:text-slate-400 md:text-xl">
                  We're expanding our range with exciting new clothing lines. Be the first to know when they launch.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="outline" className="border-slate-200 dark:border-slate-800">
                  Get Notified
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const featuredProducts = [
  {
    id: "1",
    name: "Classic Oversized Tee - Black",
    price: 29.99,
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Relaxed Fit Tee - White",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Vintage Wash Tee - Grey",
    price: 34.99,
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Premium Boxy Tee - Navy",
    price: 34.99,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=400",
  },
]

