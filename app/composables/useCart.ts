import type { CartItem, Product } from '~~/shared/types/shop'

// Shared cart state. `useState` keeps a single reactive cart across every
// page (PLP, PDP, cart, checkout) during the session.
// TODO: persist to a backend / cookie and sync with a real order API.
export function useCart() {
  const items = useState<CartItem[]>('cart-items', () => [])

  // Total number of units in the cart (used for the header badge).
  const count = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  )

  // Sum of every line item's price * quantity.
  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.product.price * item.quantity, 0),
  )

  // Two items are "the same" only when product + size + colour all match.
  function findIndex(product: Product, size: string, colour: string) {
    return items.value.findIndex(
      item =>
        item.product.slug === product.slug
        && item.size === size
        && item.colour === colour,
    )
  }

  function addItem(product: Product, size: string, colour: string, quantity = 1) {
    const index = findIndex(product, size, colour)

    if (index === -1) {
      items.value.push({ product, size, colour, quantity })
    }
    else {
      items.value[index]!.quantity += quantity
    }
  }

  function removeItem(index: number) {
    items.value.splice(index, 1)
  }

  function updateQuantity(index: number, quantity: number) {
    const item = items.value[index]
    if (!item)
      return

    // Never allow a quantity below 1; use removeItem to delete a line.
    item.quantity = Math.max(1, quantity)
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    count,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
}

// Small helper so every page formats prices the same way.
export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
