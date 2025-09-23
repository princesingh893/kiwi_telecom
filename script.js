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
                image: ""
            },
            {
                name: '20000mAh Powerbank',
                price: '₹1999',
                image: ""
            },
            {
                name: '5000mAh Mini Powerbank',
                price: '₹899',
                image: ""
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

// Function to create a product card
function createProductCard(product) {
    return `
        <div class="flex-shrink-0 w-56 sm:w-64 snap-start">
            <div class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <img src="${product.image}" alt="${product.name}" class="h-36 sm:h-40 w-full object-contain mb-3 sm:mb-4">
                <h3 class="font-semibold text-gray-800 text-center text-sm sm:text-base">${product.name}</h3>
                <p class="text-blue-600 font-bold text-base sm:text-lg my-1 sm:my-2">${product.price}</p>
                <div class="flex gap-2 w-full mt-auto">
                    <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                        Add to Cart
                    </button>
                    <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors">
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
            <h2 class="text-xl font-bold text-gray-800 mb-4 px-2">${categoryData.title}</h2>
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
                        ${categoryData.products.map(createProductCard).join('')}
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
    
    // Create and append each category section
    Object.entries(productsByCategory).forEach(([categoryId, categoryData]) => {
        const section = document.createElement('div');
        section.innerHTML = createCategorySection(categoryId, categoryData);
        mainContainer.appendChild(section);
        
        // Initialize scroll for this category
        setupCategoryScroll(categoryId);
    });
}

// ---------------- Side Menu ----------------
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
    initializeProductSections();
});