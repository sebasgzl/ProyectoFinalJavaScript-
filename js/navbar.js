
// Evento boton agregar click al btn de navbar
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("active");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("active");
});

