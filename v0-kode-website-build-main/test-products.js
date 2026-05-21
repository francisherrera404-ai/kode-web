// Verificación de sintaxis de products.js
try {
    console.log('Total de productos:', products.length);
    console.log('Categorías:', categories);
    
    const byCategory = {};
    products.forEach(p => {
        byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });
    
    console.log('Resumen por categoría:');
    Object.entries(byCategory).forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count}`);
    });
    
    const newProducts = products.filter(p => p.isNew);
    console.log(`\nNuevos productos (${newProducts.length}):`);
    newProducts.forEach(p => {
        console.log(`  - ${p.name} (${p.image})`);
    });
    
    console.log('\n✓ Verificación completada exitosamente');
} catch(e) {
    console.error('Error:', e.message);
    console.error(e.stack);
}
