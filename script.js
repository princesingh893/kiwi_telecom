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