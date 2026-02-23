import { renderProductos } from "./render.js";
import { agregarProducto } from "./agregar.js";

window.agregarProducto = agregarProducto;

document.addEventListener("DOMContentLoaded", renderProductos);
