'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

const WHATSAPP_NUMBER = '543804155476'

export function SlideOutCart() {
  const { items, isOpen, closeCart, removeItem, totalPrice, clearCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return ''
    
    const itemsList = items
      .map((item) => `${item.quantity}x ${item.product.name} (Talle ${item.size}) - ${formatPrice(item.product.price * item.quantity)}`)
      .join('. ')
    
    const message = `¡Hola KODE! Armé mi pedido en la web: ${itemsList}. Total: ${formatPrice(totalPrice)}. ¿Cómo coordinamos el pago?`
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const handleCheckout = () => {
    const url = generateWhatsAppMessage()
    if (url) {
      window.open(url, '_blank')
      clearCart()
      closeCart()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold uppercase tracking-tight">
            Tu Carrito ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 -mr-2 active:scale-95 transition-transform"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground font-medium mb-2">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-muted-foreground">
                Seleccioná un talle para agregar productos
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-secondary"
                >
                  <div className="w-20 h-24 bg-white flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold uppercase tracking-tight truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Talle: {item.size}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cant: {item.quantity}
                    </p>
                    <p className="text-sm font-black mt-2">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="self-start p-2 text-muted-foreground hover:text-foreground active:scale-95 transition-all"
                    aria-label={`Eliminar ${item.product.name} talle ${item.size}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-wider">Total</span>
              <span className="text-xl font-black">{formatPrice(totalPrice)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 px-6 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              PEDIR POR WHATSAPP
            </button>
            
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider">
              Efectivo / Transferencia
            </p>
          </div>
        )}
      </div>
    </>
  )
}
