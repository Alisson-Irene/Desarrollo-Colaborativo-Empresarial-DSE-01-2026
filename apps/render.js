import { productos } from "./data.js";

export function renderProductos() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  productos.forEach(producto => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre}
      <span>$${producto.precio}</span>
    `;
    lista.appendChild(li);
  });
}