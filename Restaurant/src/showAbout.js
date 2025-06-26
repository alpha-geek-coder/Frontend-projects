import aboutImg from "./about-image.png";
export function showAbout() {
  const mainContent = document.querySelector(".main-content");
  if (!mainContent) return;
  mainContent.textContent = ""; // reset main
  const aboutImage = document.createElement("img");
  aboutImage.src = aboutImg;
  aboutImage.alt = "about";
  aboutImage.classList.add("about-image");
  mainContent.appendChild(aboutImage);
}
