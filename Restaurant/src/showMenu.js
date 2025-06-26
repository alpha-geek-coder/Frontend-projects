import menuImg from "./menu.png";

export function showMenu() {
  const mainContent = document.querySelector(".main-content");
  if (!mainContent) return;
  mainContent.textContent = ""; // reset main
  const menuImage = document.createElement("img");
  menuImage.src = menuImg;
  menuImage.alt = "menu";
  menuImage.classList.add("menu-image");
  mainContent.appendChild(menuImage);
}
