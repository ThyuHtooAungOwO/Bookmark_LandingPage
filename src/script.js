// DOM Elements
const elements = {
  featureBtns: document.querySelectorAll("#featuresBtn button"),
  tabImage: document.getElementById("tabImage"),
  tabTitle: document.getElementById("tabTitle"),
  tabDescription: document.getElementById("tabDescription"),

  dropdownButtons: document.querySelectorAll("[data-dropdown-toggle]"),

  emailForm: document.getElementById("emailForm"),
  emailInput: document.getElementById("emailInput"),
  emailWrapper: document.getElementById("emailWrapper"),
  emailError: document.getElementById("emailError"),

  overlay: document.getElementById("menuOverlay"),
  mobileMenu: document.getElementById("mobileMenu"),
  closeBtn: document.getElementById("menuCloseBtn"),
  toggleBtn: document.getElementById("HamBtn"),
};

// Data
const tabData = [
  {
    image: "./images/illustration-features-tab-1.svg",
    title: "Bookmark in one click",
    description:
      "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
  },
  {
    image: "./images/illustration-features-tab-2.svg",
    title: "Intelligent search",
    description:
      "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
  },
  {
    image: "./images/illustration-features-tab-3.svg",
    title: "Share your bookmarks",
    description:
      "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
  },
];

// State
let emailTouched = false;

// Functions
const toggleFAQItem = (button) => {
  const content = button.nextElementSibling;
  const arrow = button.querySelector("svg");
  const path = button.querySelector("path");
  const isExpanded = content.classList.contains("max-h-0");

  content.classList.toggle("max-h-0", !isExpanded);
  content.classList.toggle("opacity-0", !isExpanded);
  content.classList.toggle("max-h-[500px]", isExpanded);
  content.classList.toggle("opacity-70", isExpanded);
  content.classList.toggle("mt-8", isExpanded);
  content.classList.toggle("mb-4", isExpanded);

  path.setAttribute("stroke", isExpanded ? "#f25f5c" : "#5267DF");
  arrow.classList.toggle("rotate-180", isExpanded);
};

const changeFeatureTab = (btn, index) => {
  // Update active state
  elements.featureBtns.forEach((b) => b.setAttribute("data-active", "false"));
  btn.setAttribute("data-active", "true");

  // Fade out animation
  elements.tabImage.classList.replace("opacity-100", "opacity-0");

  setTimeout(() => {
    // Update content
    elements.tabImage.src = tabData[index].image;
    elements.tabTitle.textContent = tabData[index].title;
    elements.tabDescription.textContent = tabData[index].description;

    // Fade in after image loads
    elements.tabImage.onload = () => {
      elements.tabImage.classList.replace("opacity-0", "opacity-100");
    };
  }, 200);
};

const validateEmail = () => {
  const isValid = elements.emailInput.checkValidity();

  if (!isValid && emailTouched) {
    elements.emailWrapper.classList.add("border-primary-red");
    elements.emailError.classList.remove("hidden");
  } else {
    elements.emailWrapper.classList.remove("border-primary-red");
    elements.emailError.classList.add("hidden");
  }
};

const toggleMobileMenu = (shouldOpen) => {
  elements.overlay.classList.toggle("opacity-0", !shouldOpen);
  elements.overlay.classList.toggle("hidden", !shouldOpen);
  elements.overlay.classList.toggle("opacity-100", shouldOpen);
  elements.overlay.classList.toggle("block", shouldOpen);

  elements.mobileMenu.classList.toggle("-right-full", !shouldOpen);
  elements.mobileMenu.classList.toggle("right-0", shouldOpen);
};

// Event Listeners
const initEventListeners = () => {
  // FAQ
  elements.dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => toggleFAQItem(button));
  });

  // Feature Tabs
  elements.featureBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => changeFeatureTab(btn, index));
  });

  // Email Form
  elements.emailInput.addEventListener("blur", () => {
    emailTouched = true;
    validateEmail();
  });

  elements.emailInput.addEventListener("input", () => {
    if (emailTouched) validateEmail();
  });

  elements.emailForm.addEventListener("submit", (e) => {
    if (!elements.emailInput.checkValidity()) {
      e.preventDefault();
      emailTouched = true;
      validateEmail();
    }
  });

  // Mobile Menu
  elements.toggleBtn.addEventListener("click", () => toggleMobileMenu(true));
  elements.closeBtn.addEventListener("click", () => toggleMobileMenu(false));
  elements.overlay.addEventListener("click", () => toggleMobileMenu(false));
};

// Initialize
document.addEventListener("DOMContentLoaded", initEventListeners);
