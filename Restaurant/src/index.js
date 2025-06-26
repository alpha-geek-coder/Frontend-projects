import "./style.css";
import homepageImg from "./homepage-background-image.jpg";

import { showHome } from './showHome';
import { showMenu } from "./showMenu";
import { showAbout } from "./showAbout";

function common() {
    const divContent = document.querySelector("#content");
    divContent.style.backgroundImage = `url(${homepageImg})`;
    divContent.style.backgroundSize = "cover";
    divContent.style.backgroundPosition = "center";

    let mainContent = divContent.querySelector(".main-content");
    if (!mainContent) {
        // Create main-content elements
        const mainContent = document.createElement("div");
        mainContent.classList.add("main-content");
        divContent.appendChild(mainContent);
    }
}


const homeButton = document.querySelector("#home-button");
const menuButton = document.querySelector("#menu-button");
const aboutButton = document.querySelector("#about-button");

homeButton.addEventListener("click", showHome);
menuButton.addEventListener("click", showMenu);
aboutButton.addEventListener("click", showAbout);

document.addEventListener("DOMContentLoaded", () => {
  common();
  showHome();
}); // landing page


