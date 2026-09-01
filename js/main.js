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

function setMobileMenu(open) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle("show", open);
  if (threeDot) threeDot.setAttribute("aria-expanded", String(open));
}

function closeMobileMenu() {
  setMobileMenu(false);
  if (threeDot) threeDot.focus();
}

if (threeDot) {
  threeDot.addEventListener("click", () => {
    setMobileMenu(!mobileMenu.classList.contains("show"));
  });
}

// Close the menu when a link inside it is chosen, or on Escape
if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMobileMenu(false));
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("show")) {
    closeMobileMenu();
  }
});

// Restore saved theme immediately (script is deferred, DOM is parsed)
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
document.getElementById("theme-icon").className =
  savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
