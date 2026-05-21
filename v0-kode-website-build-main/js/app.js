// Estado global
let currentCategory = 'TODOS';
let currentSlideIndex = 0;
let sliderInterval;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeHeroSlider();
    initializeCategories();
    initializeProducts();
    initializeEventListeners();
});

// Hero Slider
function initializeHeroSlider() {
    const newProducts = getNewProducts();
    if (newProducts.length === 0) return;

    const slider = document.getElementById('heroSlider');
    const sliderDots = document.getElementById('sliderDots');

    // Renderizar slides
    slider.innerHTML = newProducts
        .map(product => createHeroSlide(product))
        .join('');

    // Renderizar dots (solo en mobile)
    sliderDots.innerHTML = newProducts
        .map((_, index) => `
            <button class="slider-dot ${index === 0 ? 'active' : ''}" 
                    onclick="goToSlide(${index})" 
                    aria-label="Ir al slide ${index + 1}"></button>
        `)
        .join('');

    // Mostrar/ocultar botones según cantidad
    if (newProducts.length > 1) {
        document.getElementById('sliderPrev').style.display = 'flex';
        document.getElementById('sliderNext').style.display = 'flex';
        startSliderAutoplay();
    }

    updateSliderPosition();
}

function createHeroSlide(product) {
    return `
        <div class="slider-slide">
            <div class="slider-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="slider-content">
                <div>
                    <h3 class="slider-product-name">${product.name}</h3>
                    <p class="slider-product-desc">${product.description}</p>
                </div>
                <p class="slider-price">${formatPrice(product.price)}</p>
                <div>
                    <p class="size-label">SELECCIONAR TALLE</p>
                    <div class="size-options" id="hero-sizes-${product.id}">
                        ${product.sizes.map(size => `
                            <button class="size-btn" onclick="selectHeroSize('${product.id}', '${size}')" data-product="${product.id}" data-size="${size}">
                                ${size}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <button class="add-to-cart-btn disabled" id="hero-add-${product.id}" onclick="addHeroToCart('${product.id}')" disabled>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;
}

function selectHeroSize(productId, size) {
    const buttons = document.querySelectorAll(`[data-product="${productId}"]`);
    buttons.forEach(btn => btn.classList.remove('selected'));

    const selected = document.querySelector(`[data-product="${productId}"][data-size="${size}"]`);
    if (selected) {
        selected.classList.add('selected');
    }

    const addBtn = document.getElementById(`hero-add-${productId}`);
    addBtn.classList.remove('disabled');
    addBtn.disabled = false;
}

function addHeroToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selected = document.querySelector(`[data-product="${productId}"].selected`);
    if (!selected) return;

    const size = selected.dataset.size;
    cart.addItem(product, size);

    // Reset
    document.querySelectorAll(`[data-product="${productId}"]`).forEach(btn => {
        btn.classList.remove('selected');
    });
    const addBtn = document.getElementById(`hero-add-${productId}`);
    addBtn.classList.add('disabled');
    addBtn.disabled = true;
}

function startSliderAutoplay() {
    sliderInterval = setInterval(() => {
        goToNextSlide();
    }, 5000);
}

function goToSlide(index) {
    currentSlideIndex = index;
    clearInterval(sliderInterval);
    updateSliderPosition();
    startSliderAutoplay();
}

function goToNextSlide() {
    const newProducts = getNewProducts();
    currentSlideIndex = (currentSlideIndex + 1) % newProducts.length;
    updateSliderPosition();
}

function goToPrevSlide() {
    const newProducts = getNewProducts();
    currentSlideIndex = (currentSlideIndex - 1 + newProducts.length) % newProducts.length;
    updateSliderPosition();
}

function updateSliderPosition() {
    const slider = document.getElementById('heroSlider');
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Categorías
function initializeCategories() {
    const categoryScroll = document.getElementById('categoryScroll');
    categoryScroll.innerHTML = categories
        .map(category => `
            <button class="category-btn ${category === 'TODOS' ? 'active' : ''}" 
                    onclick="changeCategory('${category}')">
                ${category}
            </button>
        `)
        .join('');
}

function changeCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderProducts();
}

// Productos Grid
function initializeProducts() {
    renderProducts();
}

function renderProducts() {
    const filteredProducts = getProductsByCategory(currentCategory);
    const grid = document.getElementById('productsGrid');

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
                <p style="color: #888;">No hay productos en esta categoría</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProducts
        .map(product => createProductCard(product))
        .join('');
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isNew ? '<span class="product-badge">NUEVO</span>' : ''}
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-desc">${product.description}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-sizes" id="product-sizes-${product.id}">
                ${product.sizes.map(size => `
                    <button class="product-size-btn" 
                            onclick="selectProductSize('${product.id}', '${size}')" 
                            data-product="${product.id}" 
                            data-size="${size}">
                        ${size}
                    </button>
                `).join('')}
            </div>
            <button class="product-add-btn disabled" 
                    id="product-add-${product.id}" 
                    onclick="addProductToCart('${product.id}')" 
                    disabled>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Agregar
            </button>
        </div>
    `;
}

function selectProductSize(productId, size) {
    const buttons = document.querySelectorAll(`[data-product="${productId}"]`);
    buttons.forEach(btn => btn.classList.remove('selected'));

    const selected = document.querySelector(`[data-product="${productId}"][data-size="${size}"]`);
    if (selected) {
        selected.classList.add('selected');
    }

    const addBtn = document.getElementById(`product-add-${productId}`);
    addBtn.classList.remove('disabled');
    addBtn.disabled = false;
}

function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selected = document.querySelector(`[data-product="${productId}"].selected`);
    if (!selected) return;

    const size = selected.dataset.size;
    cart.addItem(product, size);

    // Reset
    document.querySelectorAll(`[data-product="${productId}"]`).forEach(btn => {
        btn.classList.remove('selected');
    });
    const addBtn = document.getElementById(`product-add-${productId}`);
    addBtn.classList.add('disabled');
    addBtn.disabled = true;
}

// Event Listeners
function initializeEventListeners() {
    document.getElementById('cartButton').addEventListener('click', () => cart.toggleCart());
    document.getElementById('cartClose').addEventListener('click', () => cart.closeCart());
    document.getElementById('cartOverlay').addEventListener('click', () => cart.closeCart());
    document.getElementById('sliderPrev').addEventListener('click', goToPrevSlide);
    document.getElementById('sliderNext').addEventListener('click', goToNextSlide);
    document.getElementById('checkoutBtn').addEventListener('click', () => cart.checkout());
    document.getElementById('whatsappButton').addEventListener('click', () => {
        const message = '¡Hola KODE! Tengo una consulta sobre la colección Otoño 2026.';
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}
