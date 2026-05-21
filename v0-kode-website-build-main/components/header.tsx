'use client'

import { useCart } from '@/lib/cart-context'
import { ShoppingBag } from 'lucide-react'

export function Header() {
  const { totalItems, toggleCart } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tighter">KODE</span>
        </div>
        
        <button
          onClick={toggleCart}
          className="relative p-3 -mr-2 active:scale-95 transition-transform"
          aria-label={`Carrito con ${totalItems} productos`}
        >
          <ShoppingBag className="w-6 h-6" strokeWidth={2} />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
