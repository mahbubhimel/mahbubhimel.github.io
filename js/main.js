function showDetails(btn, type) {
  const pub = btn.closest(".publication");
  const section = pub.querySelector(".details." + type);
  const isVisible = section.style.display === "block";
  pub
    .querySelectorAll(".details")
    .forEach((d) => (d.style.display = "none"));
  if (!isVisible) section.style.display = "block";
}

function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("theme-icon");
  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
    icon.className = "fas fa-moon";
  } else {
    html.setAttribute("data-theme", "dark");
    icon.className = "fas fa-sun";
  }
  localStorage.setItem("theme", html.getAttribute("data-theme"));
}

function filterPubs(type) {
  document.querySelectorAll(".publication").forEach((pub) => {
    if (type === "all" || pub.classList.contains(type)) {
      pub.style.display = "block";
    } else {
      pub.style.display = "none";
    }
  });
}

const threeDot = document.querySelector(".three-dot");
const mobileMenu = document.getElementById("mobileMenu");

if (threeDot) {
  threeDot.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

// Restore saved theme immediately (script is deferred, DOM is parsed)
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
document.getElementById("theme-icon").className =
  savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
