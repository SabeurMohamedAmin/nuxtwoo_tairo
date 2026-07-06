// Shared e-commerce types used across PLP, PDP, cart, and checkout.
// This is scaffolding data; replace with API-driven types later.

export interface Product {
  /** Unique, URL-friendly identifier used for the PDP route. */
  slug: string
  brand: string
  title: string
  price: number
  image: string
  /** Optional extra gallery images for the PDP. */
  gallery?: string[]
  colours?: string[]
  sizes?: string[]
}

export interface CartItem {
  product: Product
  /** Selected variant, kept simple for scaffolding. */
  size: string
  colour: string
  quantity: number
}
