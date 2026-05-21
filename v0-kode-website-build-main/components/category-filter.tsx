'use client'

import { useRef } from 'react'
import { categories } from '@/lib/products'

type CategoryFilterProps = {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="sticky top-16 z-40 bg-white border-b border-border">
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 text-xs font-bold tracking-wider whitespace-nowrap transition-colors active:scale-95 ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-secondary text-foreground hover:bg-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
