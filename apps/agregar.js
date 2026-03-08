import { productos, categorias } from "./data.js";
import { renderProductos } from "./render.js";

export function agregarProducto(){

const id = document.getElementById("productoId").value;

const nombre = document.getElementById("nombre").value.trim();
const precio = parseFloat(document.getElementById("precio").value);
const stock = parseInt(document.getElementById("stock").value);
const descripcion = document.getElementById("descripcion").value.trim();
const categoriaId = parseInt(document.getElementById("categoria").value);

if(!nombre || isNaN(precio) || isNaN(stock) || !descripcion){

Swal.fire("Error","Complete todos los campos","error");
return; 

}

const estado = stock>0 ? "activo":"inactivo";

if(id){

const index = productos.findIndex(p=>p.id==id);

productos[index] = {
...productos[index],
nombre,
precio,
stock,
descripcion,
categoriaId,
estado
};

Swal.fire("Actualizado","Producto actualizado","success");

}else{

const nuevoProducto = {
id: generarId(),
nombre,
precio,
stock,
descripcion,
categoriaId,
estado
};

productos.push(nuevoProducto);

Swal.fire("Éxito","Producto agregado","success");

}

limpiarFormulario();
renderProductos();
window.mostrarSeccion("listar");

}

export function editarProducto(id){

const producto = productos.find(p=>p.id===id);

document.getElementById("productoId").value=producto.id;
document.getElementById("nombre").value=producto.nombre;
document.getElementById("precio").value=producto.precio;
document.getElementById("stock").value=producto.stock;
document.getElementById("descripcion").value=producto.descripcion;
document.getElementById("categoria").value=producto.categoriaId;

document.getElementById("btnGuardar").textContent="Actualizar Producto";
document.getElementById("btnCancelar").classList.remove("oculto");

window.mostrarSeccion("crear");

}

export function eliminarProducto(id){

const index = productos.findIndex(p=>p.id===id);

Swal.fire({
title:"¿Eliminar producto?",
icon:"warning",
showCancelButton:true
}).then(result=>{

if(result.isConfirmed){

productos.splice(index,1);

renderProductos();

Swal.fire("Eliminado","Producto eliminado","success");

}

});

}

export function verDetallesProducto(id){

const producto = productos.find(p=>p.id===id);
const categoria = categorias.find(c=>c.id===producto.categoriaId);

Swal.fire({
title:producto.nombre,
html:`
<p><b>ID:</b> ${producto.id}</p>
<p><b>Precio:</b> $${producto.precio}</p>
<p><b>Stock:</b> ${producto.stock}</p>
<p><b>Descripción:</b> ${producto.descripcion}</p>
<p><b>Categoría:</b> ${categoria?.nombre}</p>
<p><b>Estado:</b> ${producto.estado}</p>
`
});

}

export function cancelarEdicion(){

limpiarFormulario();
window.mostrarSeccion("listar");

}

function limpiarFormulario(){

document.getElementById("productoId").value="";
document.getElementById("nombre").value="";
document.getElementById("precio").value="";
document.getElementById("stock").value="";
document.getElementById("descripcion").value="";
document.getElementById("categoria").selectedIndex=0;

document.getElementById("btnGuardar").textContent="Guardar Producto";
document.getElementById("btnCancelar").classList.add("oculto");

}

function generarId(){

return productos.length ?
Math.max(...productos.map(p=>p.id))+1
:1;

}

import { productos } from "./data.js";
import { renderProductos } from "./render.js";

//Guardar o actualizar
export function agregarProducto() {
  const id = document.getElementById("productoId").value;
  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value.trim();
  const categoriaId = parseInt(document.getElementById("categoria").value);
  const estado = document.getElementById("estado").value;

  if (!nombre || isNaN(precio) || precio <= 0 || !descripcion) {
    Swal.fire("Error", "Complete todos los campos correctamente", "error");
    return;
  }

  // VALIDACIÓN DE DUPLICADO (NO REPETIR NOMBRE)
  const productoExistente = productos.find(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id != id,
  );

  if (productoExistente) {
    Swal.fire("Error", "Ya existe un producto con ese nombre", "error");
    return;
  }

  // ACTUALIZAR
  if (id) {
    actualizarProductoArray(id, {
      nombre,
      precio,
      descripcion,
      categoriaId,
      estado,
    });

    Swal.fire("Actualizado", "Producto actualizado", "success");
  }
  // CREAR
  else {
    const nuevoProducto = {
      id: generarId(),
      nombre,
      precio,
      descripcion,
      categoriaId,
      estado,
    };

    productos.push(nuevoProducto);

    Swal.fire("Éxito", "Producto agregado", "success");
  }

  limpiarFormulario();
  renderProductos();
}

//Botón editar
export function editarProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  cargarDatosFormulario(producto);
}
//Cargar datos al formulario

export function cargarDatosFormulario(producto) {
  document.getElementById("productoId").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("categoria").value = producto.categoriaId;
  document.getElementById("estado").value = producto.estado;

  document.getElementById("btnGuardar").textContent = "Actualizar Producto";
  document.getElementById("btnCancelar").classList.remove("oculto");

  window.mostrarSeccion("crear");
}

export function actualizarProductoArray(id, datos) {
  const index = productos.findIndex((p) => p.id == id);
  if (index === -1) return;

  productos[index] = {
    ...productos[index],
    ...datos,
  };
}

function limpiarFormulario() {
  document.getElementById("productoId").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("descripcion").value = "";

  document.getElementById("categoria").selectedIndex = 0;
  document.getElementById("estado").selectedIndex = 0;

  document.getElementById("btnGuardar").textContent = "Guardar Producto";
  document.getElementById("btnCancelar").classList.add("oculto");
}

export function cancelarEdicion() {
  limpiarFormulario();
  window.mostrarSeccion("listar");
}

function generarId() {
<<<<<<< HEAD
  return productos.length ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
}
=======
  return productos.length
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;
}

>>>>>>> origin/develop
