'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, type Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
  variant?: 'grid' | 'hero'
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setSelectedSize(null)
  }

  if (variant === 'hero') {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {product.description}
          </p>
        </div>

        <p className="text-2xl font-black">
          {formatPrice(product.price)}
        </p>

        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2 tracking-wider">
            SELECCIONAR TALLE
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(isSelected ? null : size)}
                  className={`min-w-[48px] h-12 px-3 text-sm font-bold transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-foreground text-background ring-2 ring-foreground ring-offset-2'
                      : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                  }`}
                  aria-label={isSelected ? `Talle ${size} seleccionado` : `Seleccionar talle ${size}`}
                  aria-pressed={isSelected}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full h-14 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            selectedSize
              ? 'bg-foreground text-background hover:opacity-90'
              : 'bg-border text-muted-foreground cursor-not-allowed'
          }`}
          aria-label={selectedSize ? `Agregar ${product.name} talle ${selectedSize} al carrito` : 'Seleccionar un talle primero'}
        >
          <ShoppingBag className="w-4 h-4" />
          Agregar al carrito
        </button>
      </div>
    )
  }

  return (
    <div className="group">
      <div className="aspect-[3/4] bg-secondary mb-3 overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-foreground text-background text-[10px] font-bold px-2 py-1 tracking-wider">
            NUEVO
          </span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-tight leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-1">
          {product.description}
        </p>

        <p className="text-base font-black">
          {formatPrice(product.price)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(isSelected ? null : size)}
                className={`min-w-[36px] h-9 px-2 text-xs font-bold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-foreground text-background ring-2 ring-foreground ring-offset-1'
                    : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                }`}
                aria-label={isSelected ? `Talle ${size} seleccionado` : `Seleccionar talle ${size}`}
                aria-pressed={isSelected}
              >
                {size}
              </button>
            )
          })}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full h-10 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
            selectedSize
              ? 'bg-foreground text-background hover:opacity-90'
              : 'bg-border text-muted-foreground cursor-not-allowed'
          }`}
          aria-label={selectedSize ? `Agregar ${product.name} talle ${selectedSize} al carrito` : 'Seleccionar un talle primero'}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
