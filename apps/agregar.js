import { productos } from "./data.js";
import { renderProductos } from "./render.js";

export function agregarProducto() {
  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);

  if (nombre === "") {
    alert("El nombre no puede estar vacío");
    return;
  }

  if (isNaN(precio) || precio <= 0) {
    alert("Ingrese un precio válido");
    return;
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio
  };

  productos.push(nuevoProducto);
  renderProductos();

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
}