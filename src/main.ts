const html: HTMLElement | null = document.querySelector("html");

const button = document.querySelector("button");

button?.addEventListener("click", function (e) {
  html?.classList.toggle("dark");
});
