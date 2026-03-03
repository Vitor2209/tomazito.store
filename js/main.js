/**
 * BRAZUCA STORE - Single Page Application
 * Vanilla JS - Carrinho, Modal, Carousel, WhatsApp Checkout
 */

// ============================================
// STATE
// ============================================

let cart = JSON.parse(localStorage.getItem('brazuca_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('brazuca_favs') || '[]');
let selectedSize = null;
let modalProductId = null;
let carouselOffset = 0;

const WHATSAPP = '447544180397';

// ============================================
// UTIL
// ============================================

function saveCart() {
    localStorage.setItem('brazuca_cart', JSON.stringify(cart));
    updateCartBadge();
}

function saveFavs() {
    localStorage.setItem('brazuca_favs', JSON.stringify(favorites));
    updateFavBadge();
}

function updateCartBadge() {
    const b = document.getElementById('cartCount');
    const count = cart.reduce((s, i) => s + i.qty, 0);
    if (b) {
        b.textContent = count;
        b.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateFavBadge() {
    const b = document.getElementById('favCount');
    if (b) {
        b.textContent = favorites.length;
        b.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
}

function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// CAROUSEL (COM IMAGEM REAL)
// ============================================

function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    track.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" class="product-img">
                <button class="product-favorite ${favorites.includes(p.id) ? 'active' : ''}"
                    onclick="toggleFavorite(${p.id})">
                    ${favorites.includes(p.id) ? '♥' : '♡'}
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-team">${p.description}</p>
                <p class="product-price">£${p.price}</p>
                <button class="view-product-btn" onclick="openModal(${p.id})">
                    Ver Produto
                </button>
            </div>
        </div>
    `).join('');

    carouselOffset = 0;
    updateCarouselPosition();
}

function getCardWidth() {
    const track = document.getElementById('carouselTrack');
    const card = track?.querySelector('.product-card');
    if (!card) return 260;
    return card.offsetWidth + 24;
}

function updateCarouselPosition() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const shift = carouselOffset * getCardWidth();
    track.style.transform = `translateX(-${shift}px)`;
}

function carouselPrev() {
    if (carouselOffset > 0) {
        carouselOffset--;
        updateCarouselPosition();
    }
}

function carouselNext() {
    if (carouselOffset < products.length - 4) {
        carouselOffset++;
        updateCarouselPosition();
    }
}

// ============================================
// TIMES COM ESCUDOS REAIS
// ============================================

function renderTeams() {
    const grid = document.getElementById('teamsGrid');
    if (!grid) return;

    grid.innerHTML = brazilianTeams.map(team => `
        <div class="team-badge" onclick="filterByTeam('${team.name}')">
            <div class="team-logo">
                <img src="${team.badge}" alt="${team.name}">
            </div>
            <span class="team-name">${team.name}</span>
        </div>
    `).join('');
}

// ============================================
// FAVORITES
// ============================================

function toggleFavorite(id) {
    const idx = favorites.indexOf(id);

    if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('Removido dos favoritos!');
    } else {
        favorites.push(id);
        showToast('Adicionado aos favoritos!');
    }

    saveFavs();
    renderCarousel();
}

// ============================================
// MODAL (COM IMAGEM REAL)
// ============================================

function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    modalProductId = id;
    selectedSize = null;

    document.getElementById('modalName').textContent = p.name;
    document.getElementById('modalDesc').textContent = p.description;
    document.getElementById('modalPrice').textContent = '£' + p.price;

    document.getElementById('modalImage').innerHTML =
        `<img src="${p.image}" alt="${p.name}" class="modal-img">`;

    document.getElementById('modalSizes').innerHTML = p.sizes.map(s =>
        `<button class="size-btn" onclick="selectSize('${s}', this)">${s}</button>`
    ).join('');

    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
}

function selectSize(size, btn) {
    selectedSize = size;
    document.querySelectorAll('#modalSizes .size-btn')
        .forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function addToCartFromModal() {
    if (!selectedSize) {
        showToast('Selecione um tamanho primeiro');
        return;
    }

    const existing = cart.find(i =>
        i.id === modalProductId && i.size === selectedSize
    );

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: modalProductId, size: selectedSize, qty: 1 });
    }

    saveCart();
    showToast('Adicionado ao carrinho!');
    closeModal();
}

// ============================================
// CART
// ============================================

function openCart() {
    renderCartItems();
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = `<p>Seu carrinho está vazio</p>`;
        footer.style.display = 'none';
        return;
    }

    footer.style.display = 'block';

    container.innerHTML = cart.map((item, idx) => {
        const p = products.find(x => x.id === item.id);
        return `
            <div class="cart-item">
                <div>${p.name}</div>
                <div>${item.size}</div>
                <div>£${p.price * item.qty}</div>
                <button onclick="removeFromCart(${idx})">Remover</button>
            </div>
        `;
    }).join('');

    const total = cart.reduce((s, i) => {
        const p = products.find(x => x.id === i.id);
        return s + (p.price * i.qty);
    }, 0);

    document.getElementById('cartTotal').textContent = '£' + total;
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    saveCart();
    renderCartItems();
}

// ============================================
// WHATSAPP
// ============================================

function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let msg = 'Olá, quero comprar:\n\n';

    cart.forEach(item => {
        const p = products.find(x => x.id === item.id);
        msg += `${p.name} | Tamanho ${item.size} | Qtd ${item.qty}\n`;
    });

    const total = cart.reduce((s, i) => {
        const p = products.find(x => x.id === i.id);
        return s + (p.price * i.qty);
    }, 0);

    msg += `\nTotal: £${total}`;

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    renderCarousel();
    renderTeams();
    updateCartBadge();
    updateFavBadge();

    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    document.getElementById('modalAddToCart')?.addEventListener('click', addToCartFromModal);
    document.getElementById('carouselPrev')?.addEventListener('click', carouselPrev);
    document.getElementById('carouselNext')?.addEventListener('click', carouselNext);
    document.getElementById('checkoutBtn')?.addEventListener('click', checkoutWhatsApp);

});
