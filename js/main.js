/**
 * Brazuca Store - Main JavaScript
 * Pure JavaScript - No Frameworks
 */

// =========================================
// Global State
// =========================================
const state = {
    cart: [],
    wishlist: [],
    orders: [],
    user: null,
    currentLanguage: 'pt',
    isMenuOpen: false
};

// =========================================
// DOM Ready
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initApp();
});

// =========================================
// Initialization
// =========================================
function initApp() {
    // Update badges
    updateCartBadge();
    updateWishlistBadge();
    
    // Initialize components based on page
    initHeader();
    initLanguageSelector();
    initProductsCarousel();
    initTeamsGrid();
    initNewsletterForm();
    initMobileMenu();
    
    // Set initial language
    const savedLang = localStorage.getItem('brazucaLanguage') || 'pt';
    state.currentLanguage = savedLang;
    updateLanguageButtons();
    updateTranslations();
}

// =========================================
// State Management
// =========================================
function loadState() {
    const savedCart = localStorage.getItem('brazucaCart');
    const savedWishlist = localStorage.getItem('brazucaWishlist');
    const savedOrders = localStorage.getItem('brazucaOrders');
    const savedUser = localStorage.getItem('brazucaUser');
    
    if (savedCart) state.cart = JSON.parse(savedCart);
    if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
    if (savedOrders) state.orders = JSON.parse(savedOrders);
    if (savedUser) state.user = JSON.parse(savedUser);
}

function saveState() {
    localStorage.setItem('brazucaCart', JSON.stringify(state.cart));
    localStorage.setItem('brazucaWishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('brazucaOrders', JSON.stringify(state.orders));
    localStorage.setItem('brazucaLanguage', state.currentLanguage);
    if (state.user) {
        localStorage.setItem('brazucaUser', JSON.stringify(state.user));
    }
}

// =========================================
// Translation Functions
// =========================================
function t(key) {
    return translations[state.currentLanguage][key] || key;
}

function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = t(key);
        if (translation.includes('<br>')) {
            el.innerHTML = translation;
        } else {
            el.textContent = translation;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        el.placeholder = t(key);
    });
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === state.currentLanguage);
    });
}

// =========================================
// Header & Navigation
// =========================================
function initHeader() {
    // Scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
            }
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            state.isMenuOpen = !state.isMenuOpen;
            navMenu.classList.toggle('active', state.isMenuOpen);
            mobileMenuBtn.innerHTML = state.isMenuOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                state.isMenuOpen = false;
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// =========================================
// Language Selector
// =========================================
function initLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            state.currentLanguage = lang;
            updateLanguageButtons();
            updateTranslations();
            saveState();
            
            // Re-render products if on page
            if (typeof renderProducts === 'function') {
                renderProducts();
            }
        });
    });
}

// =========================================
// Products Carousel
// =========================================
function initProductsCarousel() {
    const carousel = document.getElementById('productsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel) return;
    
    // Render products
    renderFeaturedProducts();
    
    // Drag functionality
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });
    
    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Touch support
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Button controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

function renderFeaturedProducts() {
    const carousel = document.getElementById('productsCarousel');
    if (!carousel || typeof products === 'undefined') return;
    
    carousel.innerHTML = products.slice(0, 5).map(product => createProductCard(product)).join('');
    
    // Add event listeners
    addProductCardListeners();
}

function createProductCard(product) {
    const isInWishlist = state.wishlist.includes(product.id);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="favorite-btn ${isInWishlist ? 'active' : ''}" data-action="toggle-wishlist" data-product-id="${product.id}">
                    <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">£${product.price}</p>
                <button class="btn btn-primary" data-action="view-product" data-product-id="${product.id}">
                    ${t('view-product')}
                </button>
            </div>
        </div>
    `;
}

function addProductCardListeners() {
    // Wishlist buttons
    document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            toggleWishlist(productId);
            
            // Update button state
            const isInWishlist = state.wishlist.includes(productId);
            btn.classList.toggle('active', isInWishlist);
            btn.innerHTML = `<i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>`;
        });
    });
    
    // View product buttons
    document.querySelectorAll('[data-action="view-product"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            openProductModal(productId);
        });
    });
}

// =========================================
// Teams Grid
// =========================================
function initTeamsGrid() {
    const teamsGrid = document.getElementById('teamsGrid');
    if (!teamsGrid || typeof brazilianTeams === 'undefined') return;
    
    teamsGrid.innerHTML = brazilianTeams.map(team => `
        <div class="team-badge" data-team-id="${team.id}" title="${team.name}">
            <img src="${team.badge}" alt="${team.name}" onerror="this.src='https://via.placeholder.com/60x60?text=${team.name[0]}'">
        </div>
    `).join('');
    
    // Add click listeners
    teamsGrid.querySelectorAll('.team-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const teamId = badge.dataset.teamId;
            window.location.href = `/static/pages/produtos.html?team=${teamId}`;
        });
    });
}

// =========================================
// Product Modal
// =========================================
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">£${product.price}</p>
                    <div class="size-selector">
                        <h4>${t('select-size')}</h4>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-btn" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    <button class="btn btn-primary btn-full" id="addToCartBtn" data-product-id="${product.id}">
                        ${t('add-to-cart')}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Size selection
    let selectedSize = null;
    modal.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.dataset.size;
        });
    });
    
    // Add to cart
    modal.querySelector('#addToCartBtn').addEventListener('click', () => {
        if (!selectedSize) {
            showToast(t('msg-select-size'));
            return;
        }
        addToCart(product, selectedSize);
        closeModal(modal);
    });
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    // Escape key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

// =========================================
// Cart Functions
// =========================================
function addToCart(product, size) {
    const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        size: size,
        quantity: 1
    };
    
    state.cart.push(cartItem);
    updateCartBadge();
    saveState();
    showToast(t('msg-added-cart'));
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    updateCartBadge();
    saveState();
}

function updateCartItemQuantity(itemId, delta) {
    const item = state.cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        saveState();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = state.cart.length;
    }
}

function getCartTotal() {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// =========================================
// Wishlist Functions
// =========================================
function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    if (index > -1) {
        state.wishlist.splice(index, 1);
        showToast(t('msg-removed-wishlist'));
    } else {
        state.wishlist.push(productId);
        showToast(t('msg-added-wishlist'));
    }
    updateWishlistBadge();
    saveState();
}

function updateWishlistBadge() {
    const badge = document.getElementById('favoritesBadge');
    if (badge) {
        badge.textContent = state.wishlist.length;
    }
}

// =========================================
// Newsletter Form
// =========================================
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        showToast(t('msg-subscribed'));
        form.reset();
    });
}

// =========================================
// Toast Notification
// =========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// =========================================
// Utility Functions
// =========================================
function formatPrice(price) {
    return `£${price.toFixed(2)}`;
}