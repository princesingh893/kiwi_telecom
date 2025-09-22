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

// ---------------- Scroll Functionality for All Product Sections ---------------- //
function setupSectionScroll(section) {
  const container = section.querySelector('.overflow-x-auto');
  const scrollLeftBtn = section.querySelector('.scroll-left-btn');
  const scrollRightBtn = section.querySelector('.scroll-right-btn');
  
  if (!container) return;
  
  // Variables for touch handling
  let isDown = false;
  let startX;
  let scrollLeft;
  const scrollAmount = 300;
  
  // Update button visibility
  const updateButtons = () => {
    if (!scrollLeftBtn || !scrollRightBtn) return;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Show/hide left button
    if (container.scrollLeft > 10) {
      scrollLeftBtn.classList.remove('opacity-0');
    } else {
      scrollLeftBtn.classList.add('opacity-0');
    }
    
    // Show/hide right button
    if (container.scrollLeft < maxScroll - 10) {
      scrollRightBtn.classList.remove('opacity-0');
    } else {
      scrollRightBtn.classList.add('opacity-0');
    }
  };
  
  // Left button click
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  // Right button click
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', (e) => {
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
  
  // Mouse down event for drag scrolling
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.scrollBehavior = 'auto';
  });
  
  // Mouse leave event
  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';
  });
  
  // Mouse up event
  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';
  });
  
  // Mouse move event for drag scrolling
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
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
    const walk = (x - startX) * 2; // Scroll speed
    container.scrollLeft = scrollLeft - walk;
  }, { passive: false });
  
  // Initial button state
  updateButtons();
  
  // Update buttons on scroll
  container.addEventListener('scroll', updateButtons);
  
  // Update on window resize
  window.addEventListener('resize', updateButtons);
}

// Initialize scroll for all product sections
document.addEventListener('DOMContentLoaded', () => {
  // Get all product sections
  const productSections = document.querySelectorAll('.product-section');
  
  // Initialize scroll for each section
  productSections.forEach(section => {
    setupSectionScroll(section);
  });
});

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
      }
    ]
  },
  'chargers': {
    title: 'Chargers',
    products: [
      {
        name: 'Fast Charger 18W',
        price: '₹599',
        image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
      },
      {
        name: 'Wall Adapter',
        price: '₹349',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'Car Charger',
        price: '₹499',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
      },
      {
        name: 'Multi-Port Charger',
        price: '₹799',
        image: 'https://m.media-amazon.com/images/I/61h+Qf5o3eL._AC_UF1000,1000_QL80_.jpg'
      }
    ]
  },
  'earphones': {
    title: 'Earphones',
    products: [
      {
        name: 'Bass Boost Earphones',
        price: '₹699',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'Noise Cancelling',
        price: '₹1299',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
      },
      {
        name: 'Sports Earphones',
        price: '₹899',
        image: 'https://kdmindia.in/wp-content/uploads/2024/05/Group-66-1.png'
      }
    ]
  },
  'earbuds': {
    title: 'Earbuds',
    products: [
      {
        name: 'Wireless Earbuds',
        price: '₹1999',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'True Wireless',
        price: '₹2499',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
      }
    ]
  },
  'neckbands': {
    title: 'Neckbands',
    products: [
      {
        name: 'Bluetooth Neckband',
        price: '₹1499',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'Wireless Neckband',
        price: '₹1799',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
      }
    ]
  },
  'speakers': {
    title: 'Speakers',
    products: [
      {
        name: 'Portable Speaker',
        price: '₹1999',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'Bluetooth Speaker',
        price: '₹2999',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
      }
    ]
  },
  'powerbankCables': {
    title: 'Powerbank Cables',
    products: [
      {
        name: 'Powerbank Cable Set',
        price: '₹499',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'Fast Charge Cable',
        price: '₹399',
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
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: 'AAA Batteries (4 Pack)',
        price: '₹179',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
      }
    ]
  },
  'powerbanks': {
    title: 'Powerbanks',
    products: [
      {
        name: '10000mAh Powerbank',
        price: '₹1299',
        image: 'https://kdmindia.in/wp-content/uploads/2024/07/Group-63.png'
      },
      {
        name: '20000mAh Powerbank',
        price: '₹1999',
        image: 'https://images-cdn.ubuy.co.in/6607b41f17bd0c55404bb888-0-5ft-micro-usb-cable-6-inch-short.jpg'
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
    <div class="px-4 py-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4 px-2">${categoryData.title}</h2>
      <div class="relative group">
        <div id="${categoryId}Container" class="overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar">
          <div class="flex space-x-4 px-2" id="${categoryId}Track">
            ${categoryData.products.map(createProductCard).join('')}
          </div>
        </div>
        <!-- Navigation Buttons -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 -left-4">
          <button id="${categoryId}ScrollLeftBtn" class="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="absolute right-0 top-1/2 -translate-y-1/2 -right-4">
          <button id="${categoryId}ScrollRightBtn" class="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>`;
}

// Function to setup scroll for a specific category
function setupCategoryScroll(categoryId) {
  const container = document.getElementById(`${categoryId}Container`);
  const scrollLeftBtn = document.getElementById(`${categoryId}ScrollLeftBtn`);
  const scrollRightBtn = document.getElementById(`${categoryId}ScrollRightBtn`);
  
  if (!container) return;
  
  // Variables for touch handling
  let isDown = false;
  let startX;
  let scrollLeft;
  const scrollAmount = 300;
  
  // Update button visibility
  const updateButtons = () => {
    if (!scrollLeftBtn || !scrollRightBtn) return;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    scrollLeftBtn.style.opacity = container.scrollLeft > 0 ? 1 : 0;
    scrollRightBtn.style.opacity = container.scrollLeft < maxScroll - 5 ? 1 : 0; // Small threshold
  };
  
  // Left button click
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  // Right button click
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', (e) => {
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
  
  // Touch events for mobile swipe
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
    const walk = (x - startX) * 2; // Scroll speed
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
  }, { passive: false });
  
  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
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
document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.querySelector('main');
  
  // Clear existing product sections
  const existingSections = document.querySelectorAll('.product-section');
  existingSections.forEach(section => section.remove());
  
  // Create and append each category section
  Object.entries(productsByCategory).forEach(([categoryId, categoryData]) => {
    const section = document.createElement('div');
    section.className = 'product-section';
    section.innerHTML = createCategorySection(categoryId, categoryData);
    mainContainer.appendChild(section);
    
    // Initialize scroll for this category
    setupCategoryScroll(categoryId);
  });
});

// ---------------- Data Cables Section ---------------- //
function setupDataCablesScroll() {
  const container = document.getElementById('dataCablesContainer');
  const track = document.getElementById('dataCablesTrack');
  const scrollLeftBtn = document.getElementById('scrollLeftBtn');
  const scrollRightBtn = document.getElementById('scrollRightBtn');
  
  if (!container || !track) return;
  
  // Variables for touch handling
  let isDown = false;
  let startX;
  let scrollLeft;
  
  // Scroll buttons functionality
  const scrollAmount = 300; // Adjust scroll amount as needed
  
  const updateButtons = () => {
    if (!scrollLeftBtn || !scrollRightBtn) return;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Show/hide left button
    if (container.scrollLeft > 10) {
      scrollLeftBtn.classList.remove('opacity-0');
    } else {
      scrollLeftBtn.classList.add('opacity-0');
    }
    
    // Show/hide right button
    if (container.scrollLeft < maxScroll - 10) {
      scrollRightBtn.classList.remove('opacity-0');
    } else {
      scrollRightBtn.classList.add('opacity-0');
    }
  };
  
  // Left button click
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  // Right button click
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', (e) => {
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
  
  // Touch events for mobile swipe
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
    const walk = (x - startX) * 2; // Scroll speed
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
  }, { passive: false });
  
  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    container.scrollLeft = scrollLeft - walk;
  }, { passive: false });
  
  // Update buttons on scroll
  container.addEventListener('scroll', updateButtons);
  
  // Initial button state
  updateButtons();
  
  // Update on window resize
  window.addEventListener('resize', updateButtons);
}

// Initialize data cables scroll on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  setupDataCablesScroll();
});

// ---------------- Slider ---------------- //
const slides = document.getElementById('slides');
const totalSlides = slides.children.length;
let index = 0;

function showSlide(i) {
  slides.style.transform = `translateX(-${i * 100}%)`;
}

// Next/Prev Buttons
document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % totalSlides;
  showSlide(index);
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + totalSlides) % totalSlides;
  showSlide(index);
});

// Auto play every 3 seconds
setInterval(() => {
  index = (index + 1) % totalSlides;
  showSlide(index);
}, 3000);