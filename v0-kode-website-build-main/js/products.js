// Datos de productos
const WHATSAPP_NUMBER = '543804155476';

const products = [
    {
        id: 'buzo-money-burdeos',
        name: 'Buzo Money - Burdeos',
        description: 'Etiqueta negra "Michee"',
        price: 95000,
        category: 'BUZOS',
        sizes: ['S', 'M', 'L', 'XL'],
        image: '/products/buzo (1).jpeg',
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
];

const categories = ['TODOS', 'BUZOS', 'PANTALONES', 'CAMPERAS', 'ACCESORIOS'];

// Utilidades
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price).replace('ARS', '$');
}

function getNewProducts() {
    return products.filter(p => p.isNew);
}

function getProductsByCategory(category) {
    if (category === 'TODOS') {
        return products;
    }
    return products.filter(p => p.category === category);
}

function createShoppingBagIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>`;
}
