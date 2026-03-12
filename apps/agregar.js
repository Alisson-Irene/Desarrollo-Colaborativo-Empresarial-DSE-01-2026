import { productos, categorias, guardarProductos, guardarCategorias } from "./data.js";
import { renderProductos, cargarCategorias, renderCategorias } from "./render.js";

// =========================
// PRODUCTOS
// =========================
export function agregarProducto() {
  const id = document.getElementById("productoId").value;
  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const categoriaId = parseInt(document.getElementById("categoria").value);

  if (
    !nombre ||
    isNaN(precio) ||
    precio <= 0 ||
    isNaN(stock) ||
    stock < 0 ||
    !descripcion ||
    isNaN(categoriaId)
  ) {
    Swal.fire("Error", "Complete todos los campos correctamente", "error");
    return;
  }

  const productoExistente = productos.find(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id != id
  );

  if (productoExistente) {
    Swal.fire("Error", "Ya existe un producto con ese mismo nombre", "error");
    return;
  }

  const estado = stock > 0 ? "activo" : "inactivo";
  const imagenFinal = imagen || "https://via.placeholder.com/80x80?text=Producto";

  if (id) {
    const index = productos.findIndex((p) => p.id == id);
    if (index === -1) return;

    productos[index] = {
      ...productos[index],
      nombre,
      precio,
      stock,
      imagen: imagenFinal,
      descripcion,
      categoriaId,
      estado
    };

    Swal.fire("Actualizado", "Producto actualizado", "success");
  } else {
    productos.push({
      id: generarIdProducto(),
      nombre,
      precio,
      stock,
      imagen: imagenFinal,
      descripcion,
      categoriaId,
      estado
    });

    Swal.fire("Éxito", "Producto agregado", "success");
  }

  guardarProductos();
  limpiarFormulario();
  actualizarPreviewEstado();
  if (window.aplicarFiltros) {
    window.aplicarFiltros();
  } else {
    renderProductos();
  }
  window.mostrarSeccion("listar");
}

export function editarProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  document.getElementById("productoId").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
  document.getElementById("imagen").value = producto.imagen || "";
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("categoria").value = producto.categoriaId;

  document.getElementById("btnGuardar").textContent = "Actualizar Producto";
  actualizarPreviewEstado();
  window.mostrarSeccion("crear");
}

export function eliminarProducto(id) {
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) return;

  Swal.fire({
    title: "¿Eliminar producto?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      productos.splice(index, 1);
      reordenarIdsProductos();
      guardarProductos();

      if (window.aplicarFiltros) {
        window.aplicarFiltros();
      } else {
        renderProductos();
      }

      Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
    }
  });
}

export function verDetallesProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  const categoria = categorias.find((c) => c.id === producto.categoriaId);

  Swal.fire({
    title: producto.nombre,
    html: `
      <img src="${producto.imagen || "https://via.placeholder.com/200x200?text=Producto"}"
           alt="${producto.nombre}"
           style="width:180px; height:180px; object-fit:cover; border-radius:12px; margin-bottom:12px;">
      <p><b>ID:</b> ${producto.id}</p>
      <p><b>Precio:</b> $${producto.precio.toFixed(2)}</p>
      <p><b>Stock:</b> ${producto.stock}</p>
      <p><b>Descripción:</b> ${producto.descripcion}</p>
      <p><b>Categoría:</b> ${categoria?.nombre || "N/A"}</p>
      <p><b>Estado:</b> ${producto.estado}</p>
    `,
    icon: "info",
    confirmButtonText: "Cerrar"
  });
}

export function cancelarEdicion() {
  limpiarFormulario();
  actualizarPreviewEstado();
  window.mostrarSeccion("listar");
}

function limpiarFormulario() {
  document.getElementById("productoId").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("categoria").selectedIndex = 0;
  document.getElementById("btnGuardar").textContent = "Guardar Producto";
}

function generarIdProducto() {
  return productos.length ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
}

function reordenarIdsProductos() {
  productos.forEach((producto, index) => {
    producto.id = index + 1;
  });
}

export function actualizarPreviewEstado() {
  const stock = parseInt(document.getElementById("stock").value) || 0;
  const textoEstado = document.getElementById("textoEstado");

  if (!textoEstado) return;

  const estado = stock > 0 ? "activo" : "inactivo";
  textoEstado.textContent = estado;
  textoEstado.className = estado;
}

// =========================
// LAS CATEGORÍAS
// =========================
export function agregarCategoria() {
  const input = document.getElementById("nuevaCategoria");
  const nombre = input.value.trim();

  if (!nombre) {
    Swal.fire("Error", "Ingrese un nombre para la categoría", "error");
    return;
  }

  const existe = categorias.some(
    (c) => c.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (existe) {
    Swal.fire("Error", "Esa categoría ya existe", "error");
    return;
  }

  categorias.push({
    id: generarIdCategoria(),
    nombre
  });

  reordenarIdsCategorias();
  guardarCategorias();
  input.value = "";
  cargarCategorias();
  renderCategorias();
  actualizarFiltroCategorias();

  Swal.fire("Éxito", "Categoría agregada correctamente", "success");
}

export function eliminarCategoria(id) {
  const categoriaEnUso = productos.some((p) => p.categoriaId === id);

  if (categoriaEnUso) {
    Swal.fire(
      "No permitido",
      "No puede eliminar una categoría que está asignada a productos",
      "warning"
    );
    return;
  }

  const index = categorias.findIndex((c) => c.id === id);
  if (index === -1) return;

  Swal.fire({
    title: "¿Eliminar categoría?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      categorias.splice(index, 1);
      reordenarIdsCategorias();
      guardarCategorias();
      cargarCategorias();
      renderCategorias();
      actualizarFiltroCategorias();

      if (window.aplicarFiltros) {
        window.aplicarFiltros();
      }

      Swal.fire("Eliminada", "Categoría eliminada de forma correcta", "success");
    }
  });
}

function generarIdCategoria() {
  return categorias.length ? Math.max(...categorias.map((c) => c.id)) + 1 : 1;
}

function reordenarIdsCategorias() {
  categorias.forEach((categoria, index) => {
    categoria.id = index + 1;
  });
}

function actualizarFiltroCategorias() {
  const categoriaFiltro = document.getElementById("categoriaFiltro");
  if (!categoriaFiltro) return;

  categoriaFiltro.innerHTML = `<option value="">Filtrar por categoría</option>`;

  categorias.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nombre;
    categoriaFiltro.appendChild(option);
  });
}