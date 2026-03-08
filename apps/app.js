import { renderProductos, cargarCategorias } from "./render.js";

import {
agregarProducto,
editarProducto,
cancelarEdicion,
eliminarProducto,
verDetallesProducto
} from "./agregar.js";

window.agregarProducto = agregarProducto;
window.editarProducto = editarProducto;
window.cancelarEdicion = cancelarEdicion;
window.eliminarProducto = eliminarProducto;
window.verDetallesProducto = verDetallesProducto;

window.mostrarSeccion = function(seccion){

document.getElementById("seccionCrear")
.classList.toggle("oculto",seccion!=="crear");

document.getElementById("seccionListar")
.classList.toggle("oculto",seccion!=="listar");

};

document.addEventListener("DOMContentLoaded",()=>{

cargarCategorias();
renderProductos();

});