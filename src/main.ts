const html: HTMLElement | null = document.querySelector("html");

const button = document.querySelector("#mode-btn");
const modeIcon = button?.querySelector("img");
const modeText = button?.querySelector("span");
button?.addEventListener("click", function (e) {
  html?.classList.toggle("dark");
  if (!html?.classList.contains("dark")) {
    modeIcon && (modeIcon.src = "./src/assets/img/moon.png");
    modeText && (modeText.textContent = "Dark Mode");

    return;
  }
  modeIcon && (modeIcon.src = "./src/assets/img/sun.png");
  modeText && (modeText.textContent = "Light Mode");
});
