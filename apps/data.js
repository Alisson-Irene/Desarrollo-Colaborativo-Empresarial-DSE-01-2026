const categoriasPorDefecto = [
  { id: 1, nombre: "Electrónica" },
  { id: 2, nombre: "Hogar" },
  { id: 3, nombre: "Oficina" }
];

const productosPorDefecto = [
  {
    id: 1,
    nombre: "Producto 1",
    precio: 12,
    stock: 5,
    descripcion: "Producto de ejemplo",
    categoriaId: 1,
    estado: "activo"
  }
];

export let categorias = JSON.parse(localStorage.getItem("categorias")) || categoriasPorDefecto;
export let productos = JSON.parse(localStorage.getItem("productos")) || productosPorDefecto;

export function guardarCategorias() {
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

export function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}