/**
 * script.js — AuraBooks Main Page Logic
 * Depends on: data.js (BOOKS_DATA must be loaded first)
 */

/* ----------------------------------------------------------
   Cart Utilities  (shared logic used in both pages)
   ---------------------------------------------------------- */

/**
 * Returns the cart object from localStorage.
 * Cart format: { bookId: quantity, ... }
 * @returns {Object}
 */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('aura_cart')) || {};
    } catch {
        return {};
    }
}

/**
 * Persists the cart object to localStorage.
 * @param {Object} cart
 */
function saveCart(cart) {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
}

/**
 * Returns total number of items (sum of quantities) in the cart.
 * @returns {number}
 */
function getCartItemCount() {
    return Object.values(getCart()).reduce((sum, qty) => sum + qty, 0);
}

/* ----------------------------------------------------------
   UI Helpers
   ---------------------------------------------------------- */

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} duration  ms
 */
function showToast(message, type = 'success', duration = 2800) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { success: '✓', error: '✕', info: 'ℹ' };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<strong>${icons[type] || '•'}</strong> ${message}`;
    container.appendChild(toast);

    // Auto-remove
    const removeToast = () => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
    };

    const timer = setTimeout(removeToast, duration);
    toast.addEventListener('click', () => { clearTimeout(timer); removeToast(); });
}

/**
 * Update the navbar cart badge count.
 */
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (!countEl) return;

    const count = getCartItemCount();
    countEl.textContent = count;

    // Pulse animation on update
    countEl.classList.remove('pulse');
    void countEl.offsetWidth; // force reflow
    countEl.classList.add('pulse');
}

/* ----------------------------------------------------------
   Books Grid Rendering
   ---------------------------------------------------------- */

/**
 * Build and inject book cards into #book-list.
 */
function displayBooks() {
    const grid = document.getElementById('book-list');
    if (!grid) return;

    // Render all cards
    grid.innerHTML = BOOKS_DATA.map(book => `
        <article class="book-card" role="listitem">
            <div class="book-img-container">
                <img
                    src="${book.img}"
                    alt="${book.title} kitabının üzlüyü"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg,#f0f1ff,#e8ecff)';"
                />
            </div>
            <span class="book-genre">${book.genre}</span>
            <h3>${escapeHtml(book.title)}</h3>
            <p class="book-author">${escapeHtml(book.author)}</p>
            <span class="price-tag">$${book.price}</span>
            <button
                class="view-btn"
                onclick="showDetails(${book.id})"
                aria-label="${book.title} kitabının detallarını gör"
            >
                Detallara bax
            </button>
        </article>
    `).join('');
}

/* ----------------------------------------------------------
   Modal: Book Details
   ---------------------------------------------------------- */

/**
 * Open the book detail modal for a given book ID.
 * @param {number} id
 */
function showDetails(id) {
    const book  = BOOKS_DATA.find(b => b.id === id);
    const modal = document.getElementById('book-modal');
    const body  = document.getElementById('modal-body');

    if (!book || !modal || !body) return;

    body.innerHTML = `
        <button class="close-btn" onclick="closeModal()" aria-label="Pəncərəni bağla">&#x2715;</button>

        <div class="book-img-container modal-book-img">
            <img
                src="${book.img}"
                alt="${escapeHtml(book.title)} kitabının üzlüyü"
                onerror="this.style.display='none';"
            />
        </div>

        <span class="book-genre">${escapeHtml(book.genre)}</span>
        <h2 id="modal-title" style="margin-top: 8px;">${escapeHtml(book.title)}</h2>
        <p class="modal-author">${escapeHtml(book.author)}</p>
        <p class="modal-desc">${escapeHtml(book.desc)}</p>
        <p class="modal-price">$${book.price}</p>

        <button
            class="view-btn"
            id="add-to-cart-btn"
            onclick="addToCart(${book.id})"
            aria-label="${book.title} kitabını səbətə əlavə et"
        >
            🛒 Səbətə əlavə et
        </button>

        <p class="success-msg" id="success-msg" aria-live="polite">
            ✓ Səbətə əlavə edildi!
        </p>
    `;

    // Show modal
    modal.style.display   = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    document.getElementById('add-to-cart-btn')?.focus();
}

/**
 * Close the book detail modal.
 */
function closeModal() {
    const modal = document.getElementById('book-modal');
    if (!modal) return;

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/* ----------------------------------------------------------
   Cart: Add Item
   ---------------------------------------------------------- */

/**
 * Add a book to the cart (increments quantity if already in cart).
 * @param {number} id
 */
function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    updateCartCount();

    // Update button UI
    const btn = document.getElementById('add-to-cart-btn');
    const msg = document.getElementById('success-msg');

    if (btn) {
        btn.textContent = '✓ Əlavə edildi!';
        btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
        setTimeout(() => {
            btn.innerHTML = '🛒 Yenidən əlavə et';
            btn.style.background = '';
        }, 2000);
    }

    if (msg) {
        msg.classList.add('visible');
        setTimeout(() => msg.classList.remove('visible'), 2500);
    }
}

/* ----------------------------------------------------------
   Security Utility
   ---------------------------------------------------------- */

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* ----------------------------------------------------------
   Navbar Scroll Shadow
   ---------------------------------------------------------- */
function initScrollShadow() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handler = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // run on load
}

/* ----------------------------------------------------------
   Hamburger / Mobile Menu
   ---------------------------------------------------------- */
function initHamburger() {
    const btn   = document.getElementById('hamburger-btn');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        const isOpen = links.classList.toggle('is-open');
        btn.classList.toggle('is-active', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('is-open');
            btn.classList.remove('is-active');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ----------------------------------------------------------
   Keyboard & Click Accessibility for Modal
   ---------------------------------------------------------- */
function initModalAccessibility() {
    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

    // Close on backdrop click
    document.getElementById('book-modal')?.addEventListener('click', e => {
        if (e.target === e.currentTarget) closeModal();
    });
}

/* ----------------------------------------------------------
   Initialisation
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    updateCartCount();
    initScrollShadow();
    initHamburger();
    initModalAccessibility();
});
