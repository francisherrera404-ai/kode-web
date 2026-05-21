'use client'

import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '543804155476'

export function WhatsAppButton() {
  const handleClick = () => {
    const message = '¡Hola KODE! Tengo una consulta sobre la colección Otoño 2026.'
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform hover:bg-[#20BA5C]"
      aria-label="Consultar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </button>
  )
}
