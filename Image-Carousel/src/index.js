import "./style.css";
import imageLibrary from "./image-library.csv";

const imagesContext = require.context(".", false, /\.(png|jpe?g|jpg|svg)$/);

function getImageUrl(filename) {
  return imagesContext(`${filename}`);
}


document.addEventListener("DOMContentLoaded", () => {
  // Dropdown menu handler
  function toggleDropdown() {
    document.getElementById("dropdown-menu").classList.toggle("show");
    // Optional: update aria-expanded
  }

  // Show/hide carousel handler
  const carouselContainer = document.getElementById("carousel-container");
  function showCarousel() {
    carouselContainer.style.display = "block";
  }
  function hideCarousel() {
    carouselContainer.style.display = "none";
  }

  // Load carousel
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselDots = document.querySelector(".carousel-dots");

  imageLibrary.forEach((image, idx) => {
    const img = document.createElement("img");
    img.src = getImageUrl(image.location);
    img.alt = image.name;
    img.classList.add("carousel-slide");
    carouselInner.appendChild(img);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.slide = idx;
    carouselDots.appendChild(dot);
  });

  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }
    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlide ? "block" : "none";
      dots[i].classList.toggle("active", i === currentSlide);
    });
  }

  function changeSlide(direction) {
    showSlide(currentSlide + direction);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      showSlide(Number(e.target.dataset.slide));
    });
  });

  if (slides.length > 0) showSlide(currentSlide);

  // Dropdown menu toggle
  document
    .querySelector(".dropdown-button")
    .addEventListener("click", toggleDropdown);

  // Open/Close carousel
  document.querySelector(".open-carousel").addEventListener("click", (e) => {
    e.preventDefault();
    showCarousel();
    toggleDropdown();
  });
  document.querySelector(".hide-carousel").addEventListener("click", (e) => {
    e.preventDefault();
    hideCarousel();
    toggleDropdown();
  });

  // Carousel navigation
  document
    .querySelector(".carousel-button.prev")
    .addEventListener("click", () => changeSlide(-1));
  document
    .querySelector(".carousel-button.next")
    .addEventListener("click", () => changeSlide(1));

  // Close dropdown menu if click outside
  window.addEventListener("click", (e) => {
    if (!e.target.matches(".dropdown-button") && !e.target.matches(".bar")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("show");
      }
    }
  });
});
