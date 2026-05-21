'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { products, type Product } from '@/lib/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './product-card'

export function HeroBanner() {
  const newProducts = products.filter((p) => p.isNew)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [newProducts.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newProducts.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newProducts.length) % newProducts.length)
  }

  if (newProducts.length === 0) return null

  return (
    <section className="bg-secondary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground mb-6">
          NUEVO INGRESO
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-2">
                  <HeroProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          {newProducts.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black text-white p-2 active:scale-95 transition-transform hidden md:flex items-center justify-center"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black text-white p-2 active:scale-95 transition-transform hidden md:flex items-center justify-center"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {newProducts.length > 1 && (
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {newProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 transition-colors ${
                    index === currentIndex ? 'bg-black' : 'bg-border'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function HeroProductCard({ product }: { product: Product }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="aspect-[3/4] bg-white flex items-center justify-center overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="md:pr-8">
        <ProductCard product={product} variant="hero" />
      </div>
    </div>
  )
}
