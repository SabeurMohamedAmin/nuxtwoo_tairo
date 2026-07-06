// Shared e-commerce types used across PLP, PDP, cart, and checkout.
// This is scaffolding data; replace with API-driven types later.

export interface Product {
  /** Unique, URL-friendly identifier used for the PDP route. */
  slug: string
  brand: string
  title: string
  price: number
  /** Short 1–2 line marketing copy shown under the price on the PDP. */
  description?: string
  image: string
  /** Optional extra gallery images for the PDP. */
  gallery?: string[]
  colours?: string[]
  sizes?: string[]
  /** Sizes currently out of stock, rendered as disabled on the PDP. */
  unavailableSizes?: string[]
}

export interface CartItem {
  product: Product
  /** Selected variant, kept simple for scaffolding. */
  size: string
  colour: string
  quantity: number
}
