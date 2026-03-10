import { productos, categorias } from "./data.js";

export function renderProductos() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = " ";

  const encabezado = document.createElement("li");
  encabezado.className = "fila-encabezado";
  encabezado.innerHTML = `
    <span>Id</span>
    <span>Nombre</span>
    <span>Precio</span>
    <span>Stock</span>
    <span>Descripción</span>
    <span>Categoría</span>
    <span>Estado</span>
    <span>Acciones</span>
  `;
  lista.appendChild(encabezado);

  productos.forEach((producto) => {
    const categoria = categorias.find((c) => c.id === producto.categoriaId);

    const li = document.createElement("li");
    li.className = "fila-producto";

    li.innerHTML = `
      <span>${producto.id}</span>
      <span>${producto.nombre}</span>
      <span>$${producto.precio.toFixed(2)}</span>
      <span>${producto.stock}</span>
      <span class="descripcion">${producto.descripcion || "Sin descripción"}</span>
      <span>${categoria?.nombre || "N/A"}</span>
      <span class="${producto.estado}">${producto.estado}</span>
      <div class="acciones">
        <button class="btn-detalles" onclick="verDetallesProducto(${producto.id})">Ver</button>
        <button class="btn-editar" onclick="editarProducto(${producto.id})">Editar</button>
        <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
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
  defaultOption.textContent = "Seleccione la categoría";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  categorias.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nombre;
    select.appendChild(option);
  });
}

export function renderCategorias() {
  const lista = document.getElementById("listaCategorias");
  if (!lista) return;

  lista.innerHTML = "";

  categorias.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cat.id} - ${cat.nombre}</span>
      <button class="btn-eliminar-categoria" onclick="eliminarCategoria(${cat.id})">
        Eliminar
      </button>
    `;

    lista.appendChild(li);
  });
}