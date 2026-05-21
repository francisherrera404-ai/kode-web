'use client'

import { products } from '@/lib/products'
import { ProductCard } from './product-card'

type ProductGridProps = {
  activeCategory: string
}

export function ProductGrid({ activeCategory }: ProductGridProps) {
  const filteredProducts = activeCategory === 'TODOS'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-medium">
              No hay productos en esta categoría
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
