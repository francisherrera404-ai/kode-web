export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: 'TODOS' | 'BUZOS' | 'PANTALONES' | 'CAMPERAS' | 'ACCESORIOS'
  sizes: string[]
  image: string
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'buzo-money-burdeos',
    name: 'Buzo Money - Burdeos',
    description: 'Etiqueta negra "Michee"',
    price: 95000,
    category: 'BUZOS',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/buzo-money.jpg',
    isNew: true,
  },
  {
    id: 'conjunto-jogging-tech-fit',
    name: 'Conjunto Jogging Tech Fit - Azul Escolar',
    description: 'Conjunto completo Tech Fit',
    price: 120000,
    category: 'PANTALONES',
    sizes: ['S', 'M', 'L'],
    image: '/products/jogging-tech.jpg',
    isNew: true,
  },
  {
    id: 'remera-basica-gris',
    name: 'Remera Básica - Gris',
    description: 'Sin ningún tipo de etiqueta externa',
    price: 35000,
    category: 'BUZOS',
    sizes: ['M', 'L', 'XL'],
    image: '/products/remera-gris.jpg',
  },
  {
    id: 'chino-recto-negro',
    name: 'Chino Recto - Negro Esencial',
    description: 'Corte clásico recto',
    price: 75000,
    category: 'PANTALONES',
    sizes: ['38', '40', '42', '44'],
    image: '/products/chino-negro.jpg',
  },
  {
    id: 'riñonera-tecnica-kode',
    name: 'Riñonera Técnica KODE',
    description: 'Accesorio esencial urbano',
    price: 45000,
    category: 'ACCESORIOS',
    sizes: ['Único'],
    image: '/products/riñonera.jpg',
    isNew: true,
  },
]

export const categories = ['TODOS', 'BUZOS', 'PANTALONES', 'CAMPERAS', 'ACCESORIOS'] as const

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('ARS', '$')
}
