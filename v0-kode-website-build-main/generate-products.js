#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, 'public', 'products');
const SIZES_DEFAULT = {
    'JEANS': ['36', '38', '40', '42', '44', '46'],
    'BUZOS': ['S', 'M', 'L', 'XL', 'XXL'],
    'REMERAS': ['S', 'M', 'L', 'XL', 'XXL'],
    'JOGGINGS': ['S', 'M', 'L', 'XL'],
    'ACCESORIOS': ['Único'],
    'CAMPERAS': ['S', 'M', 'L', 'XL', 'XXL'],
    'PANTALONES': ['36', '38', '40', '42', '44']
};

const PRICE_DEFAULT = {
    'JEANS': 95000,
    'BUZOS': 85000,
    'REMERAS': 45000,
    'JOGGINGS': 110000,
    'ACCESORIOS': 50000,
    'CAMPERAS': 140000,
    'PANTALONES': 80000
};

// Mapeo de prefijos de archivo a categoría
const CATEGORY_MAP = {
    'jean': 'JEANS',
    'buzo': 'BUZOS',
    'remera': 'REMERAS',
    'jogging': 'JOGGINGS',
    'accesorios': 'ACCESORIOS',
    'campera': 'CAMPERAS',
    'boxer': 'ACCESORIOS',
    'maniqui': 'ACCESORIOS',
    'chino': 'PANTALONES',
};

function getCategoryFromFilename(filename) {
    const baseName = filename.toLowerCase().split('(')[0].trim();
    return CATEGORY_MAP[baseName] || null;
}

function generateProductId(filename, index) {
    const baseName = filename
        .replace(/\s*\(\d+\)\.\w+$/, '') // Eliminar (número).ext
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    return `${baseName}-${index}`;
}

function generateProductName(filename) {
    const baseName = filename
        .replace(/\s*\(\d+\)\.\w+$/, '') // Eliminar (número).ext
        .trim();
    
    const parts = baseName.split('-');
    const category = parts[0]
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    const number = filename.match(/\((\d+)\)/)?.[1] || '';
    return number ? `${category} - #${number}` : category;
}

function generateProducts() {
    if (!fs.existsSync(PRODUCTS_DIR)) {
        console.error(`Carpeta no encontrada: ${PRODUCTS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(PRODUCTS_DIR)
        .filter(f => /\.(jpeg|jpg|png|gif)$/i.test(f))
        .sort();

    // Agrupar por nombre base
    const filesByBase = {};
    files.forEach(file => {
        const baseName = file.replace(/\s*\(\d+\)\.\w+$/, '').trim();
        if (!filesByBase[baseName]) {
            filesByBase[baseName] = [];
        }
        filesByBase[baseName].push(file);
    });

    const products = [];
    let index = 0;

    // Procesar cada grupo de archivo
    for (const [baseName, fileList] of Object.entries(filesByBase)) {
        const category = getCategoryFromFilename(baseName);
        if (!category) continue;

        fileList.forEach((filename, fileIndex) => {
            const productId = generateProductId(filename, fileIndex + 1);
            const product = {
                id: productId,
                name: generateProductName(filename),
                description: `${category.toLowerCase()} ${fileIndex + 1}`,
                price: PRICE_DEFAULT[category],
                category: category,
                sizes: SIZES_DEFAULT[category],
                image: `/products/${filename}`,
                isNew: false // Se configurará para las últimas 3
            };
            products.push(product);
            index++;
        });
    }

    // Marcar últimas 3 como "nuevas"
    const newProductsCount = 3;
    for (let i = 0; i < newProductsCount && i < products.length; i++) {
        products[products.length - 1 - i].isNew = true;
    }

    return products;
}

function generateCategoriesArray() {
    return ['TODOS', 'JEANS', 'BUZOS', 'REMERAS', 'JOGGINGS', 'ACCESORIOS', 'CAMPERAS', 'PANTALONES'];
}

function formatProductsJS(products) {
    const categories = generateCategoriesArray();
    
    let js = `// Datos de productos - GENERADOS AUTOMÁTICAMENTE\nconst WHATSAPP_NUMBER = '543804155476';\n\n`;
    js += `const products = [\n`;

    products.forEach((product, index) => {
        js += `    {\n`;
        js += `        id: '${product.id}',\n`;
        js += `        name: '${product.name.replace(/'/g, "\\'")}',\n`;
        js += `        description: '${product.description.replace(/'/g, "\\'")}',\n`;
        js += `        price: ${product.price},\n`;
        js += `        category: '${product.category}',\n`;
        js += `        sizes: [${product.sizes.map(s => `'${s}'`).join(', ')}],\n`;
        js += `        image: '${product.image}',\n`;
        if (product.isNew) {
            js += `        isNew: true,\n`;
        }
        js += `    }${index < products.length - 1 ? ',' : ''}\n`;
    });

    js += `];\n\n`;
    js += `const categories = [${categories.map(c => `'${c}'`).join(', ')}];\n\n`;
    js += fs.readFileSync(path.join(__dirname, 'js', 'products.js'), 'utf8')
        .split('\n')
        .slice(55) // Saltamos hasta la parte de utilidades
        .join('\n');

    return js;
}

function main() {
    try {
        const products = generateProducts();
        
        if (products.length === 0) {
            console.error('No se encontraron productos');
            process.exit(1);
        }

        const content = formatProductsJS(products);
        const outputPath = path.join(__dirname, 'js', 'products.js');
        fs.writeFileSync(outputPath, content, 'utf8');

        console.log(`✓ Generados ${products.length} productos`);
        console.log(`✓ Archivo guardado: ${outputPath}`);
        console.log(`✓ Últimas 3 marcadas como nuevas`);
        
        // Mostrar resumen
        const byCategory = {};
        products.forEach(p => {
            byCategory[p.category] = (byCategory[p.category] || 0) + 1;
        });
        
        console.log('\nResumen por categoría:');
        Object.entries(byCategory).forEach(([cat, count]) => {
            console.log(`  ${cat}: ${count}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
