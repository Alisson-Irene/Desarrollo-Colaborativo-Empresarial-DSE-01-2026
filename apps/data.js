const categoriasPorDefecto = [
  { id: 1, nombre: "Electrónica" },
  { id: 2, nombre: "Hogar" },
  { id: 3, nombre: "Oficina" }
];

const productosPorDefecto = [
  {
    id: 1,
    nombre: "Producto #1",
    precio: 12,
    stock: 5,
    descripcion: "Producto de ejemplo",
    categoriaId: 1,
    estado: "activo",
    imagen: "https://via.placeholder.com/80x80?text=Producto"
  }
];

export let categorias =
  JSON.parse(localStorage.getItem("categorias")) || categoriasPorDefecto;

export let productos =
  JSON.parse(localStorage.getItem("productos")) || productosPorDefecto;

normalizarCategorias();
normalizarProductos();

export function guardarCategorias() {
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

export function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function normalizarCategorias() {
  categorias.forEach((categoria, index) => {
    categoria.id = index + 1;
  });
  guardarCategorias();
}

function normalizarProductos() {
  productos.forEach((producto, index) => {
    producto.id = index + 1;
  });
  guardarProductos();
}