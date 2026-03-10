import { renderProductos, cargarCategorias, renderCategorias } from "./render.js";
import {
  agregarProducto,
  editarProducto,
  cancelarEdicion,
  eliminarProducto,
  verDetallesProducto,
  agregarCategoria,
  eliminarCategoria,
  actualizarPreviewEstado
} from "./agregar.js";

window.agregarProducto = agregarProducto;
window.editarProducto = editarProducto;
window.cancelarEdicion = cancelarEdicion;
window.eliminarProducto = eliminarProducto;
window.verDetallesProducto = verDetallesProducto;
window.agregarCategoria = agregarCategoria;
window.eliminarCategoria = eliminarCategoria;

window.mostrarSeccion = function (seccion) {
  document.getElementById("seccionCrear").classList.toggle("oculto", seccion !== "crear");
  document.getElementById("seccionListar").classList.toggle("oculto", seccion !== "listar");
  document.getElementById("seccionCategorias").classList.toggle("oculto", seccion !== "categorias");
};

window.toggleMenu = function () {
  document.getElementById("dropdownMenu").classList.toggle("oculto");
};

window.cerrarMenu = function () {
  document.getElementById("dropdownMenu").classList.add("oculto");
};

document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  renderProductos();
  renderCategorias();
  actualizarPreviewEstado();

  const stockInput = document.getElementById("stock");
  if (stockInput) {
    stockInput.addEventListener("input", actualizarPreviewEstado);
  }

  document.addEventListener("click", (e) => {
    const menu = document.getElementById("dropdownMenu");
    const boton = document.querySelector(".menu-toggle");

    if (menu && boton && !menu.contains(e.target) && !boton.contains(e.target)) {
      menu.classList.add("oculto");
    }
  });
});