// Product data organized by category (empty shells; admin/backend will populate)
const productsByCategory = {
  dataCables: { title: 'Data Cables', products: [] },
  chargers: { title: 'Chargers', products: [] },
  earphones: { title: 'Earphones', products: [] },
  earbuds: { title: 'Earbuds', products: [] },
  neckbands: { title: 'Neckbands', products: [] },
  speakers: { title: 'Speakers', products: [] },
  powerbankCables: { title: 'Powerbank Cables', products: [] },
  batteries: { title: 'Batteries', products: [] },
  powerbanks: { title: 'Powerbanks', products: [] },
};

// Set a safe fallback logo path that works for both index.html and components/*.html
try {
  window.KIWI_FALLBACK_LOGO = (window.location.pathname || '').toLowerCase().includes('/components/')
    ? '../images/logo.png'
    : 'images/logo.png';
} catch {}

// ---------------- Dynamic Backend Integration (Firebase optional) ----------------
// Normalize category names to our internal category IDs
const CATEGORY_IDS = new Set([
    'dataCables', 'chargers', 'earphones', 'earbuds', 'neckbands', 'speakers', 'powerbankCables', 'batteries', 'powerbanks'
]);

function normalizeCategoryId(raw) {
    const s = String(raw || '').trim().toLowerCase();
    if (!s) return '';
    const map = {
        'data cables': 'dataCables',
        'datacables': 'dataCables',
        'data_cables': 'dataCables',
        'cables': 'dataCables',
        'chargers': 'chargers',
        'charger': 'chargers',
        'earphones': 'earphones',
        'earphone': 'earphones',
        'earbuds': 'earbuds',
        'tws': 'earbuds',
        'neckbands': 'neckbands',
        'neckband': 'neckbands',
        'speakers': 'speakers',
        'speaker': 'speakers',
        'powerbank cables': 'powerbankCables',
        'powerbankcables': 'powerbankCables',
        'powerbank_cables': 'powerbankCables',
        'batteries': 'batteries',
        'battery': 'batteries',
        'powerbanks': 'powerbanks',
        'powerbank': 'powerbanks'
    };
    return map[s] || (CATEGORY_IDS.has(s) ? s : '');
}

// Realtime listener for a single category page (components/*)
function startRealtimeCategoryPage(categoryId, gridElId = 'productsGrid') {
    try {
        if (!window.FIREBASE_CONFIG) return;
        if (!window.firebase) return;
        const app = (firebase.apps && firebase.apps.length) ? firebase.app() : firebase.initializeApp(window.FIREBASE_CONFIG);
        const db = firebase.firestore();
        const q = db.collection('products');
        q.onSnapshot((snap) => {
            try {
                const items = [];
                snap.forEach(doc => {
                    const d = doc.data() || {};
                    const name = String(d.name || '').trim();
                    const price = String(d.price || '').trim();
                    const image = String(d.image || '').trim();
                    const rawCat = String(d.categoryId || d.category || '').trim();
                    const cat = normalizeCategoryId(rawCat);
                    const description = String(d.description || '').trim();
                    const hidden = !!d.hidden;
                    if (!name || !price || !image || !cat) return;
                    if (hidden) return;
                    if (cat === categoryId) items.push({ id: doc.id, name, price, image, description, categoryId: cat, hidden });
                });
                const grid = document.getElementById(gridElId);
                if (!grid) return;
                if (!items.length) {
                    grid.innerHTML = `
                      <div class="col-span-full text-center py-10 text-gray-500">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                        <p class="mt-1 text-gray-500">We couldn't find any products in this category yet.</p>
                      </div>
                    `;
                } else {
                    grid.innerHTML = items.map(p => createProductCard(p, categoryId)).join('');
                }
                updateInCartBadges();
            } catch (e) {
                console.warn('Realtime category update failed:', e?.message || e);
            }
        }, (err) => {
            console.warn('Realtime category listener error:', err?.message || err);
        });
    } catch (e) {
        console.warn('Failed to start realtime category page:', e?.message || e);
    }
}

// Re-render helper: clear current product sections and rebuild
function rerenderAllProductSections() {
    try {
        document.querySelectorAll('.product-section').forEach(el => el.parentElement?.remove());
    } catch {}
    initializeProductSections();
    updateInCartBadges();
}

// Start Firestore realtime subscription (if Firebase SDK and config are present)
function startRealtimeProducts() {
    try {
        if (!window.FIREBASE_CONFIG) return; // no config
        if (!window.firebase) return; // SDK not loaded on storefront
        // Initialize app if needed (compat SDK)
        const app = (firebase.apps && firebase.apps.length) ? firebase.app() : firebase.initializeApp(window.FIREBASE_CONFIG);
        const db = firebase.firestore();
        // Listen only to visible products
        const q = db.collection('products');
        // Keep local snapshot and update UI on change
        q.onSnapshot((snap) => {
            try {
                const items = [];
                snap.forEach(doc => {
                    const d = doc.data() || {};
                    const name = String(d.name || '').trim();
                    const price = String(d.price || '').trim();
                    const image = String(d.image || '').trim();
                    const rawCat = String(d.categoryId || d.category || '').trim();
                    const categoryId = normalizeCategoryId(rawCat);
                    const description = String(d.description || '').trim();
                    const hidden = !!d.hidden;
                    if (!name || !price || !image || !categoryId) return;
                    if (hidden) return;
                    items.push({ id: doc.id, name, price, image, description, categoryId, hidden });
                });
                // Reset current category lists, then merge from backend
                Object.keys(productsByCategory).forEach(k => { productsByCategory[k].products = []; });
                if (items.length) mergeBackendProducts(items);
                rerenderAllProductSections();
            } catch (e) {
                console.warn('Realtime update failed:', e?.message || e);
            }
        }, (err) => {
            console.warn('Realtime listener error:', err?.message || err);
        });
    } catch (e) {
        console.warn('Failed to start realtime products:', e?.message || e);
    }
}

function pickKey(obj, keys) {
    for (const k of keys) {
        if (k in obj && obj[k] != null && String(obj[k]).trim() !== '') return obj[k];
        // try case-insensitive match
        const found = Object.keys(obj).find(kk => kk.toLowerCase() === String(k).toLowerCase());
        if (found && obj[found] != null && String(obj[found]).trim() !== '') return obj[found];
    }
    return '';
}

function normalizeRowToProduct(row) {
    // Accept various header names commonly used in Sheets
    const name = String(pickKey(row, ['name', 'product', 'product name', 'product_name'])).trim();
    const price = String(pickKey(row, ['price', 'mrp', 'amount'])).trim();
    const image = String(pickKey(row, ['image', 'img', 'img url', 'image url', 'image_url', 'img_url', 'photo'])).trim();
    const rawCat = String(pickKey(row, ['category', 'cat', 'type', 'section'])).trim();
    const categoryId = normalizeCategoryId(rawCat);
    if (!name || !price || !image || !categoryId) return null;
    return { name, price, image, categoryId };
}

function mergeBackendProducts(products) {
    // Insert backend products at the beginning of each category list so admin items appear first
    const grouped = {};
    products.forEach(p => {
        if (!grouped[p.categoryId]) grouped[p.categoryId] = [];
        grouped[p.categoryId].push({ name: p.name, price: p.price, image: p.image, description: p.description, hidden: !!p.hidden, id: p.id || null });
    });
    Object.entries(grouped).forEach(([cat, items]) => {
        if (!productsByCategory[cat]) {
            productsByCategory[cat] = { title: (cat.charAt(0).toUpperCase() + cat.slice(1)), products: [] };
        }
        const existing = productsByCategory[cat].products || [];
        // Avoid duplicates by name (case-insensitive)
        const existingNames = new Set(existing.map(it => (it.name || '').toLowerCase()));
        const toAdd = items.filter(it => !existingNames.has((it.name || '').toLowerCase()));
        productsByCategory[cat].products = [...toAdd, ...existing];
    });
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src; s.async = true; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
}

async function loadProductsFromBackend() {
    // If Firebase config not provided, skip (fallback to hardcoded products)
    if (!window.FIREBASE_CONFIG) return;
    try {
        // Load Firebase compat SDKs (safe for non-module pages)
        await loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
        await loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js');

        if (!window.firebase) throw new Error('Firebase SDK failed to load');
        const app = firebase.apps?.length ? firebase.app() : firebase.initializeApp(window.FIREBASE_CONFIG);
        const db = firebase.firestore(app);

        // Read products collection; only items not hidden
        const snap = await db.collection('products').where('hidden', '==', false).get().catch(async (err) => {
            // If no field/where error or missing index, fallback to full collection and local filter
            const s2 = await db.collection('products').get();
            return { docs: s2.docs };
        });
        const items = (snap.docs || []).map(d => ({ id: d.id, ...(d.data() || {}) }));
        const normalized = items.map(row => {
            const name = String(row.name || '').trim();
            const price = String(row.price || '').trim();
            const image = String(row.image || '').trim();
            const rawCat = String(row.categoryId || row.category || '').trim();
            const categoryId = normalizeCategoryId(rawCat);
            const description = String(row.description || '').trim();
            const hidden = !!row.hidden;
            if (!name || !price || !image || !categoryId) return null;
            return { id: row.id, name, price, image, description, categoryId, hidden };
        }).filter(Boolean);
        if (normalized.length) {
            mergeBackendProducts(normalized);
        }
    } catch (e) {
        console.warn('Backend load failed:', e?.message || e);
    }
}

// Kick off loading early so both index and category pages can await
try { window.KIWI_PRODUCTS_READY = loadProductsFromBackend(); } catch {}

function getCategoryTitle(categoryId) {
    return productsByCategory[categoryId]?.title || categoryId;
}

function getProducts(categoryId) {
    return productsByCategory[categoryId]?.products || [];
}

// Ensure external image URLs are safe and encode '+' which some CDNs misinterpret
function getSafeImageUrl(url) {
    try {
        const s = String(url || '');
        // Encode '+' which may be treated as space by some CDNs
        return s.replace(/\+/g, '%2B');
    } catch { return url; }
}

// Function to create a product card
function createProductCard(product, categoryId) {
    return `
        <div class="product-card flex-shrink-0 w-56 sm:w-64 snap-start" data-name="${(product.name || '').toLowerCase()}" data-category="${categoryId}">
            <div class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative">
                <span data-in-cart-badge class="hidden absolute top-2 right-2 bg-green-100 text-green-700 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full border border-green-300">In Cart</span>
                <img src="${getSafeImageUrl(product.image)}" alt="${product.name}" loading="lazy" fetchpriority="low" decoding="async" class="h-36 sm:h-40 w-full object-contain mb-3 sm:mb-4" onerror="this.onerror=null;this.src=window.KIWI_FALLBACK_LOGO;">
                <h3 class="font-semibold text-gray-800 text-center text-sm sm:text-base">${product.name}</h3>
                ${product.description ? `<p class=\"text-gray-600 text-xs sm:text-sm text-center mt-1\">${product.description}</p>` : ''}
                <p class="text-blue-600 font-bold text-base sm:text-lg my-1 sm:my-2">${product.price}</p>
                <div class="flex items-center justify-between w-full mb-2 gap-3">
                    <label class="flex items-center gap-2 text-sm">
                        <input type="checkbox" data-select />
                        <span>Select</span>
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                        <span>Qty</span>
                        <input type="number" data-qty min="1" value="1" class="w-16 border rounded px-2 py-1 text-sm text-center" />
                    </label>
                </div>
                <div class="flex gap-2 w-full mt-auto">
                    <button data-action="add" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                        Add to Cart
                    </button>
                    <button data-action="buy" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>`;
}

// Function to create a category section
function createCategorySection(categoryId, categoryData) {
    return `
        <div class="px-4 py-6 product-section" style="content-visibility:auto;contain-intrinsic-size:1px 420px;">
            <h2 class="section-header text-xl font-bold text-gray-800 mb-4 px-2">${categoryData.title}</h2>
            <div class="relative group">
                <!-- Scroll buttons -->
                <button class="scroll-btn scroll-btn-left" data-category="${categoryId}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button class="scroll-btn scroll-btn-right" data-category="${categoryId}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>
                
                <!-- Scrollable Container -->
                <div id="${categoryId}Container" class="overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar">
                    <div class="flex space-x-4 px-2" id="${categoryId}Track">
                        ${categoryData.products.map(p => createProductCard(p, categoryId)).join('')}
                    </div>
                </div>
            </div>
        </div>`;
}

// Function to setup scroll for a specific category
function setupCategoryScroll(categoryId) {
    const container = document.getElementById(`${categoryId}Container`);
    const leftBtn = document.querySelector(`.scroll-btn-left[data-category="${categoryId}"]`);
    const rightBtn = document.querySelector(`.scroll-btn-right[data-category="${categoryId}"]`);
    
    if (!container) return;
    
    // Variables for touch handling
    let isDown = false;
    let startX;
    let scrollLeft;
    const scrollAmount = 300;
    
    // Update button visibility
    const updateButtons = () => {
        if (!leftBtn || !rightBtn) return;
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Show/hide left button
        if (container.scrollLeft > 10) {
            leftBtn.style.opacity = '1';
        } else {
            leftBtn.style.opacity = '0';
        }
        
        // Show/hide right button
        if (container.scrollLeft < maxScroll - 10) {
            rightBtn.style.opacity = '1';
        } else {
            rightBtn.style.opacity = '0';
        }
    };
    
    // Left button click
    if (leftBtn) {
        leftBtn.addEventListener('click', (e) => {
            e.preventDefault();
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Right button click
    if (rightBtn) {
        rightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Mouse wheel horizontal scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY + e.deltaX;
    }, { passive: false });
    
    // Mouse events for drag scrolling
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        container.style.scrollBehavior = 'auto';
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
        container.style.scrollBehavior = 'smooth';
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
        container.style.scrollBehavior = 'smooth';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.scrollBehavior = 'auto';
    }, { passive: false });
    
    container.addEventListener('touchend', () => {
        isDown = false;
        container.style.scrollBehavior = 'smooth';
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    }, { passive: false });
    
    // Update buttons on scroll
    container.addEventListener('scroll', updateButtons);
    
    // Initial button state
    updateButtons();
    
    // Update on window resize
    window.addEventListener('resize', updateButtons);
}

// Initialize all category sections
function initializeProductSections() {
    const mainContainer = document.body;
    const order = [
        'dataCables', 'chargers', 'earphones', 'earbuds', 'neckbands', 'speakers', 'powerbankCables', 'batteries', 'powerbanks'
    ];
    order.forEach((categoryId) => {
        if (!productsByCategory[categoryId]) return;
        const merged = {
            title: getCategoryTitle(categoryId),
            products: getProducts(categoryId)
        };
        if (!merged.products || merged.products.length === 0) return; // skip empty categories
        const section = document.createElement('div');
        section.innerHTML = createCategorySection(categoryId, merged);
        mainContainer.appendChild(section);
        setupCategoryScroll(categoryId);
    });
}

// Update badges and button states to reflect which items are in cart
function updateInCartBadges() {
    try {
        const cart = loadCartIndex();
        const existing = new Set(cart.map(it => `${(it.category || '')}|||${(it.name || '').toLowerCase()}`));
        document.querySelectorAll('.product-card').forEach(card => {
            const name = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
            const category = card.getAttribute('data-category') || '';
            const key = `${category}|||${name}`;
            const inCart = existing.has(key);
            const badge = card.querySelector('[data-in-cart-badge]');
            const addBtn = card.querySelector('[data-action="add"]');
            if (badge) badge.classList.toggle('hidden', !inCart);
            if (addBtn) {
                if (inCart) {
                    addBtn.setAttribute('disabled', 'true');
                    addBtn.classList.add('opacity-60', 'cursor-not-allowed');
                    addBtn.textContent = 'In Cart';
                } else {
                    addBtn.removeAttribute('disabled');
                    addBtn.classList.remove('opacity-60', 'cursor-not-allowed');
                    addBtn.textContent = 'Add to Cart';
                }
            }
        });
    } catch {}
}

// ---------------- Search & Filter ----------------
function setupSearch() {
    const input = document.getElementById('searchInput');
    const select = document.getElementById('searchCategory');
    const clearBtn = document.getElementById('clearSearch');
    const productSections = document.querySelectorAll('.product-section');

    if (!input || !select || !clearBtn) return; // Exit if elements not found

    function filterProducts() {
        const searchTerm = input.value.trim().toLowerCase();
        const category = select.value;
        let anyVisible = false;

        productSections.forEach(section => {
            const products = section.querySelectorAll('.product-card');
            let sectionHasVisibleProducts = false;

            products.forEach(product => {
                const productName = (product.getAttribute('data-name') || '').toLowerCase();
                const productCategory = product.getAttribute('data-category') || '';
                const matchesSearch = searchTerm === '' || productName.includes(searchTerm);
                const matchesCategory = !category || productCategory === category || category === 'all';
                const isVisible = matchesSearch && matchesCategory;
                
                product.style.display = isVisible ? 'block' : 'none';
                if (isVisible) sectionHasVisibleProducts = true;
                anyVisible = anyVisible || isVisible;
            });
            section.style.display = sectionHasVisibleProducts ? 'block' : 'none';
        });

        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = anyVisible ? 'none' : 'block';
        }
    }

    // Initial filter on page load
    filterProducts();

    // Event listeners
    input.addEventListener('input', filterProducts);
    select.addEventListener('change', filterProducts);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            select.value = 'all';
            filterProducts();
            input.focus();
        });
    }
}

// (Search is initialized after sections are created later)

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
// Function to set menu width based on screen size
function setMenuWidth() {
    if (window.innerWidth <= 500) {
        sideMenu.style.width = "100%";
    } else {
        sideMenu.style.width = (window.innerWidth - 50) + "px";
    }
}

// Open menu
menuBtn?.addEventListener("click", () => {
    setMenuWidth();
    sideMenu.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
});

// Close menu with X button
closeMenu?.addEventListener("click", () => {
    sideMenu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
});

// Close menu when clicking on background
overlay?.addEventListener("click", () => {
    sideMenu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
});

// Update width on window resize
window.addEventListener("resize", () => {
    if (!sideMenu.classList.contains("-translate-x-full")) {
        setMenuWidth();
    }
});

// ---------------- Slider ----------------
const slides = document.getElementById('slides');
const totalSlides = slides ? slides.children.length : 0;
let index = 0;

function showSlide(i) {
    if (slides) {
        slides.style.transform = `translateX(-${i * 100}%)`;
    }
}

// Next/Prev Buttons
document.getElementById('next')?.addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    showSlide(index);
});

document.getElementById('prev')?.addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
});

// Auto play every 3 seconds
if (slides) {
    setInterval(() => {
        index = (index + 1) % totalSlides;
        showSlide(index);
    }, 3000);
}
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for sheet products to be ready (best-effort)
    try { await (window.KIWI_PRODUCTS_READY || Promise.resolve()); } catch {}
    if (!window.SKIP_INIT) {
        initializeProductSections();
        // Add no results message if it doesn't exist
        const host = document.querySelector('main') || document.body;
        if (host && !document.getElementById('noResults')) {
            const noResults = document.createElement('div');
            noResults.id = 'noResults';
            noResults.className = 'hidden text-center py-10';
            noResults.innerHTML = `
                <div class="text-gray-500">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                    <p class="mt-1 text-gray-500">We couldn't find any products matching your search.</p>
                </div>
            `;
            host.appendChild(noResults);
        }
        // Initialize search after sections are mounted
        setupSearch();
        // Start realtime updates (no refresh needed) if Firebase is available
        startRealtimeProducts();

    }
    // Ensure stable styles for floating action buttons across breakpoints
    try {
        if (!document.getElementById('kiwi-floating-styles')) {
            const style = document.createElement('style');
            style.id = 'kiwi-floating-styles';
            style.textContent = `
                .kiwi-floating { position: fixed; bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px)); right: 1rem; z-index: 9999; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
                .kiwi-floating + .kiwi-floating { right: 10.5rem; } /* when two buttons present */
                #kiwi-floating-spacer { height: 5.5rem; }
            `;
            document.head.appendChild(style);
        }
    } catch {}

    // Create floating multi-select buttons
    createFloatingButtons();

    // Setup side menu collapsible sections
    setupSideMenuToggles();
    // Reflect existing cart state on product cards
    updateInCartBadges();
});

// Create floating action buttons for multi-select add/buy
function createFloatingButtons() {
    try {
        const path = (window.location.pathname || '').toLowerCase();
        // Don't show on checkout page
        if (path.endsWith('/checkout.html') || path.endsWith('checkout.html')) return;

        let addBtn = document.getElementById('addSelectedBtn');
        let buyBtn = document.getElementById('buySelectedBtn');

        if (!addBtn) {
            addBtn = document.createElement('button');
            addBtn.id = 'addSelectedBtn';
            addBtn.className = 'kiwi-floating bg-gray-800 text-white px-4 py-3 text-sm font-medium hover:bg-gray-700 active:scale-[.98]';
            addBtn.textContent = 'Add Selected';
            addBtn.title = 'Add all selected items to cart';
            addBtn.addEventListener('click', () => {
                const { addedCount, skippedNames, selectedCount } = addSelectedToCart({ uncheckAfter: true });
                if (!selectedCount) { alert('No items selected.'); return; }
                if (addedCount) {
                    // Quick feedback
                    try { addBtn.textContent = `Added ${addedCount}`; setTimeout(() => addBtn.textContent = 'Add Selected', 1200); } catch {}
                }
                if (skippedNames && skippedNames.length) {
                    // Optional: keep it silent or inform minimal
                    console.log('Skipped (already in cart):', skippedNames);
                }
                // Update badges and states
                updateInCartBadges();
            });
            document.body.appendChild(addBtn);
        }

        if (!buyBtn) {
            buyBtn = document.createElement('button');
            buyBtn.id = 'buySelectedBtn';
            buyBtn.className = 'kiwi-floating bg-blue-600 text-white px-4 py-3 text-sm font-medium hover:bg-blue-700 active:scale-[.98]';
            buyBtn.textContent = 'Buy Selected';
            buyBtn.title = 'Add selected items and go to checkout';
            buyBtn.addEventListener('click', () => {
                const { addedCount, selectedCount } = addSelectedToCart({ uncheckAfter: true });
                if (!selectedCount) { alert('No items selected.'); return; }
                // Proceed to checkout whether newly added or already present
                updateInCartBadges();
                navigateToCheckout();
            });
            document.body.appendChild(buyBtn);
        }
        // Ensure bottom spacer exists so floating buttons don't cover last product
        if (!document.getElementById('kiwi-floating-spacer')) {
            const spacer = document.createElement('div');
            spacer.id = 'kiwi-floating-spacer';
            // place near end of body so layout reserves space
            spacer.style.width = '100%';
            document.body.appendChild(spacer);
        }
    } catch {}
}

// ---------------- Cart Management (Index Page) ----------------
// These helpers are used on index.html only; checkout.html defines its own helpers.
function loadCartIndex() {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
}
function saveCartIndex(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addCardToCart(cardEl, forcedQty) {
    if (!cardEl) return null;
    const name = cardEl.querySelector('h3')?.textContent?.trim() || '';
    const price = cardEl.querySelector('.text-blue-600')?.textContent?.trim() || '';
    const img = cardEl.querySelector('img')?.getAttribute('src') || '';
    const category = cardEl.getAttribute('data-category') || '';

    let qty = forcedQty;
    if (!Number.isFinite(qty)) {
        const qtyInput = cardEl.querySelector('[data-qty]');
        qty = parseInt(qtyInput?.value || '1', 10);
    }
    if (!Number.isFinite(qty) || qty < 1) qty = 1;

    const cart = loadCartIndex();
    // Block duplicate items by name (and category if present)
    const exists = cart.some(it => (it.name || '').toLowerCase() === name.toLowerCase() && (it.category || '') === category);
    if (exists) {
        alert(`${name} is already in your cart.`);
        return null;
    }
    const item = { name, price, image: img, category, qty };
    cart.push(item);
    saveCartIndex(cart);
    return item;
}

// Event delegation for Add to Cart / Buy Now
document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-action="add"]');
    const buyBtn = e.target.closest('[data-action="buy"]');
    if (!addBtn && !buyBtn) return;
    const card = (addBtn || buyBtn)?.closest('.product-card');
    if (!card) return;

    const qtyInput = card.querySelector('[data-qty]');
    let qty = parseInt(qtyInput?.value || '1', 10);
    if (!Number.isFinite(qty) || qty < 1) qty = 1;
    const added = addCardToCart(card, qty);
    if (!added) return; // user cancelled

    if (buyBtn) {
        // Navigate to checkout after adding
        navigateToCheckout();
    } else {
        // Provide lightweight feedback
        try {
            addBtn.textContent = 'Added ✓';
            setTimeout(() => { if (!addBtn.hasAttribute('disabled')) addBtn.textContent = 'Add to Cart'; }, 1200);
        } catch {}
    }
    // Uncheck selection for this card after action
    try { card.querySelector('[data-select]').checked = false; } catch {}
    // Update badges and button states
    updateInCartBadges();
});

function navigateToCheckout() {
    try {
        const path = (window.location.pathname || '').toLowerCase();
        if (path.includes('/components/')) {
            window.location.href = '../checkout.html?openOrder=1';
        } else {
            window.location.href = 'checkout.html?openOrder=1';
        }
    } catch {
        // Fallback
        window.location.href = 'checkout.html?openOrder=1';
    }
}

// -------- Side Menu: Render Your Cart Preview --------
function setupSideMenuToggles() {
    // Your Cart elements
    const cartToggle = document.getElementById('sideCartToggle');
    const cartContent = document.getElementById('sideCartContent');
    const cartChevron = document.getElementById('sideCartChevron');
    const cartSection = document.getElementById('sideCartSection');
    const sideScroll = document.getElementById('sideMenuScroll');
    // About Us elements
    const aboutToggle = document.getElementById('aboutToggle');
    const aboutContent = document.getElementById('aboutContent');
    const aboutChevron = document.getElementById('aboutChevron');
    const aboutSection = document.getElementById('aboutSection');

    // About Us toggle
    if (aboutToggle && aboutContent && aboutChevron) {
        const aboutHandleToggle = () => {
            const isHidden = aboutContent.classList.contains('hidden');
            aboutContent.classList.toggle('hidden');
            aboutChevron.textContent = isHidden ? '▾' : '▸';
        };
        aboutToggle.addEventListener('click', aboutHandleToggle);
        aboutSection?.addEventListener('click', (ev) => {
            if ((ev.target instanceof Element) && ev.target.closest('#aboutContent')) return;
            if ((ev.target instanceof Element) && ev.target.closest('#aboutToggle')) return;
            aboutHandleToggle();
        });
    }

    // Your Cart toggle
    if (cartToggle && cartContent && cartChevron) {
        const cartHandleToggle = () => {
            const isHidden = cartContent.classList.contains('hidden');
            cartContent.classList.toggle('hidden');
            cartChevron.textContent = isHidden ? '▾' : '▸';
            if (isHidden) {
                // If opening, ensure latest cart is shown
                renderSideCart();
                try {
                    const cart = loadCartIndex();
                    if (!cart || cart.length === 0) {
                        // Scroll to top so categories are visible
                        sideScroll?.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                } catch {}
            }
        };
        cartToggle.addEventListener('click', cartHandleToggle);
        cartSection?.addEventListener('click', (ev) => {
            if ((ev.target instanceof Element) && ev.target.closest('#sideCartContent')) return;
            if ((ev.target instanceof Element) && ev.target.closest('#sideCartToggle')) return;
            cartHandleToggle();
        });
    }
}

// Render Your Cart preview in side menu
function renderSideCart() {
    try {
        const container = document.getElementById('sideCartItems');
        const countBadge = document.getElementById('sideCartCount');
        if (!container && !countBadge) return; // nothing to do
        const cart = loadCartIndex();
        if (countBadge) countBadge.textContent = String(cart.length);
        if (!container) return;
        if (!cart.length) {
            container.innerHTML = '<div class="text-sm text-gray-500">Your cart is empty.</div>';
            return;
        }
        // Toolbar for multi-select actions
        const toolbar = `
            <div id="sideCartToolbar" class="flex items-center justify-between py-2 border-b mb-1">
                <label class="flex items-center gap-2 text-sm">
                    <input id="sideCartSelectAll" type="checkbox" />
                    <span>Select All</span>
                </label>
                <button id="sideCartRemoveSelected" class="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">Remove Selected</button>
            </div>
        `;
        // Items list with individual checkboxes
        const itemsHtml = cart.map((it, i) => `
            <div class="flex items-center gap-3 py-2 border-b last:border-b-0">
                <input type="checkbox" class="side-cart-select" data-index="${i}" />
                <img src="${it.image}" alt="${it.name}" class="w-12 h-12 object-contain bg-white rounded" />
                <div class="flex-1">
                    <div class="text-sm font-medium line-clamp-2">${it.name}</div>
                    <div class="text-xs text-gray-600">${it.category} • Qty: ${it.qty || 1}</div>
                </div>
                <div class="flex flex-col items-end gap-1">
                    <div class="text-sm font-semibold whitespace-nowrap">${it.price}</div>
                    <button class="text-xs text-red-600 hover:text-red-700" data-side-remove="${i}">Remove</button>
                </div>
            </div>
        `).join('');
        container.innerHTML = toolbar + itemsHtml;

        // Wire remove buttons
        container.querySelectorAll('[data-side-remove]').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.getAttribute('data-side-remove'));
                const c = loadCartIndex();
                if (idx >= 0 && idx < c.length) {
                    c.splice(idx, 1);
                    saveCartIndex(c);
                    if (countBadge) countBadge.textContent = String(c.length);
                    renderSideCart();
                    updateInCartBadges();
                }
            });
        });
        // Wire Select All and Remove Selected
        const selectAll = container.querySelector('#sideCartSelectAll');
        const removeSelected = container.querySelector('#sideCartRemoveSelected');
        const itemCheckboxes = Array.from(container.querySelectorAll('.side-cart-select'));
        if (selectAll) {
            selectAll.addEventListener('change', () => {
                const checked = !!selectAll.checked;
                itemCheckboxes.forEach(cb => { cb.checked = checked; });
            });
        }
        if (removeSelected) {
            removeSelected.addEventListener('click', () => {
                const toRemove = itemCheckboxes
                    .filter(cb => cb.checked)
                    .map(cb => Number(cb.getAttribute('data-index')))
                    .filter(i => Number.isFinite(i))
                    .sort((a,b) => b - a); // remove from end to start
                if (!toRemove.length) return;
                const c = loadCartIndex();
                toRemove.forEach(i => { if (i >= 0 && i < c.length) c.splice(i, 1); });
                saveCartIndex(c);
                if (countBadge) countBadge.textContent = String(c.length);
                renderSideCart();
                updateInCartBadges();
            });
        }
    } catch {}
}

// Populate side cart when menu opens
menuBtn?.addEventListener('click', () => {
    // allow opening animation then render
    setTimeout(renderSideCart, 50);
});

// Utility: add all selected product cards to cart
function addSelectedToCart(options = {}) {
    const { uncheckAfter = false } = options;
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const selected = cards.filter(c => c.querySelector('[data-select]')?.checked);
    const selectedCount = selected.length;
    let addedCount = 0;
    const skippedNames = [];
    // Build a set of existing names in cart to avoid multiple alerts
    const cart = loadCartIndex();
    const existing = new Set(cart.map(it => `${(it.category || '')}|||${(it.name || '').toLowerCase()}`));
    selected.forEach(card => {
        const name = card.querySelector('h3')?.textContent?.trim() || '';
        const category = card.getAttribute('data-category') || '';
        const key = `${category}|||${name.toLowerCase()}`;
        if (existing.has(key)) {
            skippedNames.push(name);
            if (uncheckAfter) { try { card.querySelector('[data-select]').checked = false; } catch {} }
            return;
        }
        const qtyInput = card.querySelector('[data-qty]');
        let qty = parseInt(qtyInput?.value || '1', 10);
        if (!Number.isFinite(qty) || qty < 1) qty = 1;
        const added = addCardToCart(card, qty);
        if (added) {
            existing.add(key);
            addedCount += 1;
            if (uncheckAfter) { try { card.querySelector('[data-select]').checked = false; } catch {} }
        }
    });
    return { addedCount, skippedNames, selectedCount };
}
