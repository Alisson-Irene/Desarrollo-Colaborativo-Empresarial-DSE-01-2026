import { productos, categorias } from "./data.js";
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

// Funciones globales
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

// Filtros y búsqueda
window.aplicarFiltros = function () {
  const inputBusqueda = document.getElementById("busquedaProducto");
  const ordenFiltro = document.getElementById("ordenFiltro");
  const categoriaFiltro = document.getElementById("categoriaFiltro");
  const estadoFiltro = document.getElementById("estadoFiltro");

  let resultado = [...productos];

  const texto = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : "";
  if (texto) {
    resultado = resultado.filter((producto) =>
      producto.nombre.toLowerCase().includes(texto)
    );
  }

  const categoria = categoriaFiltro ? categoriaFiltro.value : "";
  if (categoria) {
    resultado = resultado.filter((producto) =>
      producto.categoriaId == categoria
    );
  }

  const estado = estadoFiltro ? estadoFiltro.value : "";
  if (estado) {
    resultado = resultado.filter((producto) =>
      producto.estado === estado
    );
  }

  const orden = ordenFiltro ? ordenFiltro.value : "";

  if (orden === "nombre") {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  if (orden === "precio") {
    resultado.sort((a, b) => a.precio - b.precio);
  }

  renderProductos(resultado);
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

  const categoriaFiltro = document.getElementById("categoriaFiltro");
  if (categoriaFiltro) {
    categoriaFiltro.innerHTML = `<option value="">Filtrar por categoría</option>`;

    categorias.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.nombre;
      categoriaFiltro.appendChild(option);
    });
  }

  const inputBusqueda = document.getElementById("busquedaProducto");
  const ordenFiltro = document.getElementById("ordenFiltro");
  const estadoFiltro = document.getElementById("estadoFiltro");

  if (inputBusqueda) inputBusqueda.addEventListener("input", window.aplicarFiltros);
  if (ordenFiltro) ordenFiltro.addEventListener("change", window.aplicarFiltros);
  if (categoriaFiltro) categoriaFiltro.addEventListener("change", window.aplicarFiltros);
  if (estadoFiltro) estadoFiltro.addEventListener("change", window.aplicarFiltros);

  document.addEventListener("click", (e) => {
    const menu = document.getElementById("dropdownMenu");
    const boton = document.querySelector(".menu-toggle");

    if (menu && boton && !menu.contains(e.target) && !boton.contains(e.target)) {
      menu.classList.add("oculto");
    }
  });
});