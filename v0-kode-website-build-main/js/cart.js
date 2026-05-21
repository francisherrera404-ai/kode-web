// Carrito de compras
class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
    }

    addItem(product, size) {
        const existingItem = this.items.find(
            item => item.product.id === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ product, size, quantity: 1 });
        }
        this.isOpen = true;
        this.render();
    }

    removeItem(productId, size) {
        this.items = this.items.filter(
            item => !(item.product.id === productId && item.size === size)
        );
        this.render();
    }

    clearCart() {
        this.items = [];
        this.render();
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
    }

    openCart() {
        this.isOpen = true;
        this.render();
    }

    closeCart() {
        this.isOpen = false;
        this.render();
    }

    toggleCart() {
        this.isOpen = !this.isOpen;
        this.render();
    }

    render() {
        this.updateBadge();
        this.updateSidebar();
    }

    updateBadge() {
        const badge = document.getElementById('cartBadge');
        const totalItems = this.getTotalItems();

        if (totalItems > 0) {
            badge.textContent = totalItems > 9 ? '9+' : totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    updateSidebar() {
        const overlay = document.getElementById('cartOverlay');
        const sidebar = document.getElementById('cartSidebar');
        const cartCount = document.getElementById('cartCount');
        const itemsContainer = document.getElementById('cartItems');
        const footer = document.getElementById('cartFooter');

        if (this.isOpen) {
            overlay.classList.add('open');
            sidebar.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('open');
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
        }

        cartCount.textContent = this.items.length;

        if (this.items.length === 0) {
            itemsContainer.innerHTML = `
                <div class="cart-empty">
                    <p>Tu carrito está vacío</p>
                    <p class="cart-empty-hint">Seleccioná un talle para agregar productos</p>
                </div>
            `;
            footer.style.display = 'none';
        } else {
            itemsContainer.innerHTML = this.items
                .map(item => this.renderCartItem(item))
                .join('');
            footer.style.display = 'block';
            document.getElementById('totalPrice').textContent = formatPrice(this.getTotalPrice());
        }
    }

    renderCartItem(item) {
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-content">
                    <div class="cart-item-name">${item.product.name}</div>
                    <div class="cart-item-size">Talle: ${item.size}</div>
                    <div class="cart-item-quantity">Cant: ${item.quantity}</div>
                    <div class="cart-item-price">${formatPrice(item.product.price * item.quantity)}</div>
                </div>
                <button class="cart-item-remove" onclick="cart.removeItem('${item.product.id}', '${item.size}')" aria-label="Eliminar ${item.product.name}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    }

    generateWhatsAppMessage() {
        if (this.items.length === 0) return '';

        const itemsList = this.items
            .map(item => `${item.quantity}x ${item.product.name} (Talle ${item.size}) - ${formatPrice(item.product.price * item.quantity)}`)
            .join('. ');

        const message = `¡Hola KODE! Armé mi pedido en la web: ${itemsList}. Total: ${formatPrice(this.getTotalPrice())}. ¿Cómo coordinamos el pago?`;

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    checkout() {
        const url = this.generateWhatsAppMessage();
        if (url) {
            window.open(url, '_blank');
            this.clearCart();
            this.closeCart();
        }
    }
}

// Instancia global
const cart = new ShoppingCart();
