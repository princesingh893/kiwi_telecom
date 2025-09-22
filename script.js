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

// ---------------- Horizontal Scroll for Product Sections ---------------- //
function setupHorizontalScroll(containerSelector, scrollAmount = 300) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const scrollContent = container.querySelector('.overflow-x-auto');
  const scrollLeftBtn = container.querySelector('.scroll-left-btn');
  const scrollRightBtn = container.querySelector('.scroll-right-btn');
  
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      scrollContent.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => {
      scrollContent.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }
  
  // Hide/show buttons based on scroll position
  const updateButtonVisibility = () => {
    if (!scrollLeftBtn || !scrollRightBtn) return;
    
    const scrollLeft = scrollContent.scrollLeft;
    const maxScroll = scrollContent.scrollWidth - scrollContent.clientWidth;
    
    scrollLeftBtn.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
    scrollRightBtn.style.visibility = scrollLeft < maxScroll - 5 ? 'visible' : 'hidden'; // Small threshold
  };
  
  // Initial check
  updateButtonVisibility();
  
  // Update on scroll
  scrollContent.addEventListener('scroll', updateButtonVisibility);
  
  // Update on window resize
  window.addEventListener('resize', updateButtonVisibility);
}

// Initialize horizontal scroll for all product sections
document.addEventListener('DOMContentLoaded', () => {
  // For the data cables section
  setupHorizontalScroll('.data-cables-section');
  
  // You can add more sections here if needed
  // setupHorizontalScroll('.another-section');
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