// SLIDER FUNCTIONALITY
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// NAVBAR TOGGLE FUNCTIONS
function openMenu() {
  document.getElementById("menuOverlay")?.classList.add("active");
}

function closeMenu() {
  document.getElementById("menuOverlay")?.classList.remove("active");
}

// LOAD NAVBAR DYNAMICALLY
document.addEventListener("DOMContentLoaded", () => {
  // Create placeholder div
  const navbarContainer = document.createElement("div");
  navbarContainer.id = "navbar-container";
  document.body.insertBefore(navbarContainer, document.body.firstChild);

  // Fetch navbar.html and inject
  fetch("navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Navbar not found");
      }
      return response.text();
    })
    .then(data => {
      navbarContainer.innerHTML = data;
      setupNavbarMenu(); // Setup after inject
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });

  // Start the slider
  showSlide(slideIndex);
  setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
});

// Setup navbar functionality after load
function setupNavbarMenu() {
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("menuOverlay");

  if (menuIcon) {
    menuIcon.addEventListener("click", openMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  if (navLinks) {
    navLinks.addEventListener("click", (e) => e.stopPropagation());
  }
}
function calculateTotal() {
  let total = 0;
  const selectedRooms = document.querySelectorAll('.room:checked');

  selectedRooms.forEach(room => {
    const roomPrice = parseInt(room.dataset.price);
    total += roomPrice;

    // check if +1 bed is selected for this room
    const bedCheckbox = document.querySelector(`.extra-bed[data-room="${room.id}"]`);
    if (bedCheckbox && bedCheckbox.checked) {
      total += 1800;
    }
  });

  document.getElementById('total-price').textContent = total;
}

document.querySelectorAll('.room, .extra-bed').forEach(input => {
  input.addEventListener('change', calculateTotal);
});

function proceedToPay() {
  const total = document.getElementById('total-price').textContent;
  alert(`Thank you! Your total booking cost is ₹${total}`);
  // Replace with payment gateway link in future
}
