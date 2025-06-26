
import workingHoursData from "./data-working-hours.csv";

export function showHome() {
  const mainContent = document.querySelector(".main-content");
  if (!mainContent) return;
  mainContent.textContent = ""; // reset main
  // <article class="intro"> - start
  const introArticle = document.createElement("article");
  introArticle.classList.add("intro");
  mainContent.appendChild(introArticle);

  // <h2>Welcome to My Restaurant</h2>
  const introHeader = document.createElement("h2");
  introHeader.textContent = "Welcome to My Restaurant";
  introArticle.appendChild(introHeader);

  // <h3>A Taste of Tradition, A Touch of Modern</h3>
  const introSubHeader = document.createElement("h3");
  introSubHeader.textContent = "A Taste of Tradition, A Touch of Modern";
  introArticle.appendChild(introSubHeader);

  // <p>At <strong>My-Restaurant</strong>, we ...
  const introPara = document.createElement("p");

  // Create the <strong> element and set its text
  const strong = document.createElement("strong");
  strong.textContent = "My-Restaurant";

  // Add text nodes and assemble the structure
  introPara.appendChild(document.createTextNode("At "));
  introPara.appendChild(strong);
  introPara.appendChild(
    document.createTextNode(
      ", we blend classic flavors with contemporary flair to create a truly unforgettable dining experience. Whether you’re joining us for a cozy family dinner, a business lunch, or a special celebration, our warm atmosphere and attentive service will make you feel right at home."
    )
  );
  introArticle.appendChild(introPara);
  // <article class="intro"> - end

  // <article class="working-hours"> - start
  const workingHoursArticle = document.createElement("article");
  workingHoursArticle.classList.add("working-hours");
  mainContent.appendChild(workingHoursArticle);

  // <h2>Welcome to My Restaurant</h2>
  const workingHoursHeader = document.createElement("h2");
  workingHoursHeader.textContent = "Working Hours";
  workingHoursArticle.appendChild(workingHoursHeader);

  // Create working hours table
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Day</th><th>Hours</th></tr>";
  const tbody = document.createElement("tbody");
  // Build td using working-hours.csv
  // workingHours is imported as an array of objects, e.g.:
  // [{Day: "Monday", Hours: "Closed"}, ...]
  console.log(workingHoursData);
  workingHoursData.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.Day}</td><td>${row.Hours}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  workingHoursArticle.appendChild(table);
  // <article class="working-hours"> - end

  // <article class="location"> - start
  const locationArticle = document.createElement("article");
  const locationHeader = document.createElement("h2");
  locationHeader.textContent = "Location";
  locationArticle.appendChild(locationHeader);

  const locationAddress = document.createElement("h3");
  locationAddress.textContent = "📍123 Main Street, Hometown, USA";
  locationArticle.appendChild(locationAddress);
  mainContent.appendChild(locationArticle);
  // <article class="location"> - end
}
