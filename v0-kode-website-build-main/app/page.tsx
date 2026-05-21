'use client'

import { useState } from 'react'
import { CartProvider } from '@/lib/cart-context'
import { Header } from '@/components/header'
import { HeroBanner } from '@/components/hero-banner'
import { CategoryFilter } from '@/components/category-filter'
import { ProductGrid } from '@/components/product-grid'
import { SlideOutCart } from '@/components/slide-out-cart'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Footer } from '@/components/footer'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('TODOS')

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroBanner />
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <ProductGrid activeCategory={activeCategory} />
        </main>
        <Footer />
        <SlideOutCart />
        <WhatsAppButton />
      </div>
    </CartProvider>
  )
}
