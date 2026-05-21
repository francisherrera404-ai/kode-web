export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-black tracking-tighter mb-4">KODE</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Ropa masculina urbana.<br />
              Colección Otoño 2026.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] mb-4 text-white/50">
              UBICACIÓN
            </h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Calle Proyectada 2<br />
              Buenos Aires, Argentina
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] mb-4 text-white/50">
              CONTACTO
            </h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Todas las ventas se coordinan<br />
              exclusivamente por WhatsApp.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8">
          <p className="text-xs text-white/40 text-center tracking-wider">
            © 2026 KODE. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  )
}
