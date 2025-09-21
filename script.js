// ---------------- Side Menu ----------------
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

// Open menu
menuBtn?.addEventListener("click", () => {
  // set width = screen width - 50px
  sideMenu.style.width = (window.innerWidth) + "px";

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
    sideMenu.style.width = (window.innerWidth - 50) + "px";
  }
});