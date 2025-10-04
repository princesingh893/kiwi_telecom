// Product data organized by category
const productsByCategory = {
    'dataCables': {
        title: 'Data Cables',
        products: [
            {
                name: 'Premium Data Cable',
                price: '₹299',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
            },
            {
                name: 'Micro USB Cable',
                price: '₹199',
                image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
            },
            {
                name: 'Fast Charger Cable',
                price: '₹399',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
            },
            {
                name: 'Braided Nylon Cable',
                price: '₹349',
                image: 'https://m.media-amazon.com/images/I/61h+Qf5o3eL._AC_UF1000,1000_QL80_.jpg'
            },
            {
                name: 'USB C to C Cable',
                price: '₹449',
                image: 'https://m.media-amazon.com/images/I/61h+Qf5o3eL._AC_UF1000,1000_QL80_.jpg'
            },
            {
                name: 'Lightning Cable',
                price: '₹399',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
            }
        ]
    },
    'earbuds': {
        title: 'Earbuds',
        products: [
            {
                name: 'Wireless Earbuds Pro',
                price: '₹1999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/TWS.png'
            },
            {
                name: 'True Wireless Earbuds',
                price: '₹2499',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/TWS.png'
            },
            {
                name: 'Sports Earbuds',
                price: '₹1599',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/TWS.png'
            },
            {
                name: 'Noise Cancelling Earbuds',
                price: '₹2999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/TWS.png'
            },
            {
                name: 'Budget Earbuds',
                price: '₹999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/TWS.png'
            }
        ]
    },
    'neckbands': {
        title: 'Neckbands',
        products: [
            {
                name: 'Bluetooth Neckband Pro',
                price: '₹1499',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-63-4.png'
            },
            {
                name: 'Wireless Neckband',
                price: '₹1799',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-63-4.png'
            },
            {
                name: 'Sports Neckband',
                price: '₹1299',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-63-4.png'
            },
            {
                name: 'Bass Boost Neckband',
                price: '₹1999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-63-4.png'
            }
        ]
    },
    'speakers': {
        title: 'Speakers',
        products: [
            {
                name: 'Portable Bluetooth Speaker',
                price: '₹1999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-65-2.png'
            },
            {
                name: 'Wireless Speaker Pro',
                price: '₹2999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-65-2.png'
            },
            {
                name: 'Mini Speaker',
                price: '₹999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-65-2.png'
            },
            {
                name: 'Waterproof Speaker',
                price: '₹2499',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-65-2.png'
            },
            {
                name: 'Party Speaker',
                price: '₹3999',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-65-2.png'
            }
        ]
    },
    'powerbankCables': {
        title: 'Powerbank Cables',
        products: [
            {
                name: 'Powerbank Cable Set',
                price: '₹499',
                image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
            },
            {
                name: 'Fast Charge Cable',
                price: '₹399',
                image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
            },
            {
                name: 'Multi-Port Cable',
                price: '₹599',
                image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
            },
            {
                name: 'Braided Power Cable',
                price: '₹449',
                image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
            }
        ]
    },
    'batteries': {
        title: 'Batteries',
        products: [
            {
                name: 'AA Batteries (4 Pack)',
                price: '₹199',
                image: 'https://wallpapers.com/images/hd/two-blue-batteries-digital-art-ocd0wqv13iqit9wg.jpg'
            },
            {
                name: 'AAA Batteries (4 Pack)',
                price: '₹179',
                image: 'https://wallpapers.com/images/hd/two-blue-batteries-digital-art-ocd0wqv13iqit9wg.jpg'
            },
            {
                name: 'Rechargeable Battery Kit',
                price: '₹899',
                image: 'https://wallpapers.com/images/hd/two-blue-batteries-digital-art-ocd0wqv13iqit9wg.jpg'
            },
            {
                name: 'Button Cell Batteries',
                price: '₹149',
                image: 'https://wallpapers.com/images/hd/two-blue-batteries-digital-art-ocd0wqv13iqit9wg.jpg'
            }
        ]
    },
    'powerbanks': {
        title: 'Powerbanks',
        products: [
            {
                name: '10000mAh Powerbank',
                price: '₹1299',
                image: "https://m.media-amazon.com/images/I/61iJUdK1iWL._SL1500_.jpg"
            },
            {
                name: '20000mAh Powerbank',
                price: '₹1999',
                image: "https://m.media-amazon.com/images/I/61iJUdK1iWL._SL1500_.jpg"
            },
            {
                name: '5000mAh Mini Powerbank',
                price: '₹899',
                image: "https://m.media-amazon.com/images/I/61iJUdK1iWL._SL1500_.jpg"
            }
        ]
    },
    'earphones': {
        title: 'Earphones',
        products: [
            {
                name: 'Bass Boost Earphones',
                price: '₹699',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
            },
            {
                name: 'Noise Cancelling Earphones',
                price: '₹1299',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
            },
            {
                name: 'Sports Earphones',
                price: '₹899',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
            },
            {
                name: 'In-Ear Earphones',
                price: '₹499',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
            },
            {
                name: 'Studio Earphones',
                price: '₹1599',
                image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
            }
        ]
    },
    'chargers': {
        title: 'Chargers',
        products: [
            {
                name: 'Fast Charger 18W',
                price: '₹599',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63-2-1.png'
            },
            {
                name: 'Wall Adapter',
                price: '₹349',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63-2-1.png'
            },
            {
                name: 'Car Charger',
                price: '₹499',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63-2-1.png'
            },
            {
                name: 'Multi-Port Charger',
                price: '₹799',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63-2-1.png'
            },
            {
                name: 'Wireless Charger',
                price: '₹1299',
                image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63-2-1.png'
            }
        ]
    }
};

function getCategoryTitle(categoryId) {
    return productsByCategory[categoryId]?.title || categoryId;
}

function getProducts(categoryId) {
    return productsByCategory[categoryId]?.products || [];
}

// Function to create a product card
function createProductCard(product, categoryId) {
    return `
        <div class="product-card flex-shrink-0 w-56 sm:w-64 snap-start" data-name="${(product.name || '').toLowerCase()}" data-category="${categoryId}">
            <div class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <img src="${product.image}" alt="${product.name}" class="h-36 sm:h-40 w-full object-contain mb-3 sm:mb-4">
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
        <div class="px-4 py-6 product-section">
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
        const section = document.createElement('div');
        section.innerHTML = createCategorySection(categoryId, merged);
        mainContainer.appendChild(section);
        setupCategoryScroll(categoryId);
    });
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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

    }
    // Create floating Add Selected button (also for component pages)
    if (!document.getElementById('addSelectedBtn')) {
        const btn = document.createElement('button');
        btn.id = 'addSelectedBtn';
        btn.textContent = 'Add Selected';
        btn.className = 'fixed bottom-6 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg z-40';
        btn.addEventListener('click', () => {
            const cards = Array.from(document.querySelectorAll('.product-card'));
            const selected = cards.filter(c => c.querySelector('[data-select]')?.checked);
            if (!selected.length) {
                alert('Select at least one product.');
                return;
            }
            let addedCount = 0;
            selected.forEach(card => {
                const qtyInput = card.querySelector('[data-qty]');
                let qty = parseInt(qtyInput?.value || '1', 10);
                if (!Number.isFinite(qty) || qty < 1) qty = 1;
                addCardToCart(card, qty);
                addedCount += 1;
            });
            alert(`Added ${addedCount} product(s) to cart.`);
        });
        document.body.appendChild(btn);
    }
});

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

    const item = { name, price, image: img, category, qty };
    const cart = loadCartIndex();
    cart.push(item); // Always add as a new line item
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
            setTimeout(() => { addBtn.textContent = 'Add to Cart'; }, 1200);
        } catch {}
    }
});

function navigateToCheckout() {
    try {
        const path = (window.location.pathname || '').toLowerCase();
        if (path.includes('/components/')) {
            window.location.href = '../checkout.html';
        } else {
            window.location.href = 'checkout.html';
        }
    } catch {
        // Fallback
        window.location.href = 'checkout.html';
    }
}
