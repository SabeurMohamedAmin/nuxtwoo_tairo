import type { Product } from '~~/shared/types/shop'

// Placeholder catalogue used by the PLP, PDP, and recommendation carousels.
// TODO: replace with data fetched from a real product API.
export const products: Product[] = [
  {
    slug: 'nike-sportswear-club-tee',
    brand: 'Nike',
    title: 'Sportswear Club T-Shirt',
    price: 29,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    ],
    colours: ['Black', 'White', 'Grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'carhartt-wip-pocket-tee',
    brand: 'Carhartt WIP',
    title: 'Pocket T-Shirt',
    price: 39,
    image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=600&q=80',
    colours: ['White', 'Green'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'stussy-8-ball-tee',
    brand: 'Stüssy',
    title: '8 Ball Graphic Tee',
    price: 45,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    colours: ['Black', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'tnf-simple-dome-tee',
    brand: 'The North Face',
    title: 'Simple Dome T-Shirt',
    price: 35,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    colours: ['Black', 'Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    slug: 'adidas-trefoil-tee',
    brand: 'Adidas',
    title: 'Trefoil T-Shirt',
    price: 32,
    image: 'https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?auto=format&fit=crop&w=600&q=80',
    colours: ['White', 'Black', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'patta-basic-script-tee',
    brand: 'Patta',
    title: 'Basic Script Tee',
    price: 49,
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80',
    colours: ['Black', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

// Convenience lookup used by the PDP route.
export function findProduct(slug: string) {
  return products.find(product => product.slug === slug)
}
