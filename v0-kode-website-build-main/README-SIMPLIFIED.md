# KODE - Versión Simplificada

Un sitio e-commerce de ropa masculina urbana completamente refactorizado a **HTML/CSS/JavaScript vanilla**, eliminando todas las dependencias complejas de React, Next.js y Tailwind.

## 🎯 Características

- ✅ **Diseño visual idéntico** al original
- ✅ **Sin dependencias** - HTML/CSS/JS puro
- ✅ **Sin build process** - Funciona directamente en el navegador
- ✅ **Fácil de mantener** - Código simple y legible
- ✅ **Responsive** - Funciona en todos los dispositivos
- ✅ **Carrito de compras** - Con sincronización vía WhatsApp
- ✅ **Hero slider** - Carrusel automático de productos nuevos
- ✅ **Filtro de categorías** - Con scroll horizontal
- ✅ **Grid de productos** - 2 columnas mobile, 4 columnas desktop

## 📁 Estructura

```
.
├── index.html              # HTML principal
├── styles/
│   └── style.css          # Todos los estilos
├── js/
│   ├── products.js        # Datos y utilidades
│   ├── cart.js            # Lógica del carrito
│   └── app.js             # Lógica principal
├── public/
│   └── products/          # Imágenes de productos
└── README.md
```

## 🚀 Cómo usar

### Desarrollo local
1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! El sitio funciona sin necesidad de servidor

### Para usar en producción
Puedes subir los archivos directamente a:
- **Netlify** (arrastra y suelta `index.html`)
- **GitHub Pages**
- **Vercel** (como static files)
- Cualquier hosting que sirva archivos estáticos

## 📦 Archivos principales

### `index.html`
Estructura HTML completa con:
- Header con carrito
- Hero banner/slider
- Filtro de categorías
- Grid de productos
- Carrito lateral
- Footer
- Botón WhatsApp

### `styles/style.css`
Todo el CSS en un único archivo (~600 líneas):
- Responsive design
- Variables CSS para temas
- Grid layouts
- Animaciones suaves
- Estados de elementos

### `js/products.js`
- Array de productos
- Categorías
- Función de formateo de precios
- Utilidades de filtrado

### `js/cart.js`
Clase `ShoppingCart` con:
- Agregar/remover items
- Calcular totales
- Generar mensaje WhatsApp
- Renderizar interfaz

### `js/app.js`
Lógica principal:
- Inicialización del slider
- Renderizado de categorías
- Renderizado de productos
- Event listeners

## 🎨 Personalización

### Cambiar productos
Edita el array `products` en `js/products.js`:

```javascript
const products = [
    {
        id: 'id-unico',
        name: 'Nombre del producto',
        description: 'Descripción',
        price: 95000,
        category: 'BUZOS',
        sizes: ['S', 'M', 'L', 'XL'],
        image: '/products/imagen.jpg',
        isNew: true,
    },
    // más productos...
];
```

### Cambiar colores
Modifica las variables CSS en `styles/style.css`:

```css
:root {
    --bg: #ffffff;
    --fg: #1a1a1a;
    --secondary: #f7f7f7;
    /* ... más variables */
}
```

### Cambiar número de WhatsApp
En `js/products.js`:

```javascript
const WHATSAPP_NUMBER = 'tu-numero-aqui';
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (2 columnas)
- **Tablet/Desktop**: ≥ 768px (4 columnas)

El código maneja automáticamente:
- Slider con flechas en desktop
- Dots de navegación en mobile
- Menú de categorías con scroll horizontal

## ⚡ Performance

- **Tamaño total**: ~50KB (sin imágenes)
- **Carga inicial**: < 1s
- **Cero dependencias externas**
- **Animaciones GPU-aceleradas**

## 🔄 Migración desde versión anterior

Los datos de productos se mantienen idénticos. Solo necesitas:

1. Copiar las imágenes a `/public/products/`
2. Actualizar rutas de imágenes si es necesario
3. Testear en todos los navegadores

## 🐛 Troubleshooting

**"Las imágenes no cargan"**
- Verifica que están en `/public/products/`
- Revisa la consola del navegador (F12)

**"El carrito no abre"**
- Abre la consola (F12) y busca errores
- Verifica que `js/cart.js` está cargado

**"El slider no se mueve"**
- Revisa que hay al menos 2 productos con `isNew: true`
- Verifica que `js/app.js` está cargado

## 📝 Licencia

© 2026 KODE. Todos los derechos reservados.

## 💡 Tips

- Mantén los estilos en una sola carpeta CSS para fácil personalización
- Los IDs de productos deben ser únicos
- Las imágenes deben estar en `/public/products/`
- Testea en mobile antes de publicar

---

¡Sitio mantenible para alguien sin experiencia! 🎉
