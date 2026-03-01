import { renderProductos, cargarCategorias } from "./render.js";
import { agregarProducto, editarProducto, cancelarEdicion } from "./agregar.js";

window.cancelarEdicion = cancelarEdicion;
window.agregarProducto = agregarProducto;
window.editarProducto = editarProducto;

window.mostrarSeccion = function (seccion) {
  document.getElementById("seccionCrear").classList.toggle("oculto", seccion !== "crear");
  document.getElementById("seccionListar").classList.toggle("oculto", seccion !== "listar");
};

document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  renderProductos();
});