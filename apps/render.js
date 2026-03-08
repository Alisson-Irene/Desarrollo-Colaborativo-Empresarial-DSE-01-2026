import { productos, categorias } from "./data.js";

export function renderProductos() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  productos.forEach(producto => {
    const categoria = categorias.find(c => c.id === producto.categoriaId);

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="info">
        <strong>${producto.nombre}</strong>
        <small>${producto.descripcion}</small>
        <small>Categoría: ${categoria?.nombre || "N/A"}</small>
        <small class="${producto.estado}">
          Estado: ${producto.estado}
        </small>
      </div>

      <div class="acciones">
        <span class="precio">$${producto.precio.toFixed(2)}</span>
        <button class="btn-editar" onclick="editarProducto(${producto.id})">

          
           Editar

        </button>
      </div>
    `;

    lista.appendChild(li);
  });
}

export function cargarCategorias() {
  const select = document.getElementById("categoria");
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Seleccione categoría";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nombre;
    select.appendChild(option);
  });
}