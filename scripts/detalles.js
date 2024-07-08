import { obtenerProductoPorId } from "../modules/services.js";
import { contadorTotal, pintarDetalles } from "../modules/uiDetalles.js";


const productoSeleccionado = {};
const idProducto = sessionStorage.getItem("idProducto");
const carritoCompras = JSON.parse(sessionStorage.getItem("carrito")) || [];
const botonRegresar = document.getElementById("regresar");
const botonAgregarCarrito = document.getElementById("agregarCarrito");

botonRegresar.addEventListener("click", () => {
  location.href = "../index.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  const detalleProducto = await obtenerProductoPorId(idProducto);
  productoSeleccionado.idProducto = detalleProducto.id;
  productoSeleccionado.precioUnitario = detalleProducto.precioUnitario;
  pintarDetalles(detalleProducto);
  contadorTotal(detalleProducto.precioUnitario);
  console.log(detalleProducto);
});

botonAgregarCarrito.addEventListener("click", () => {
  const color = document.querySelector(
    '#seleccionColor input[name="color"]:checked'
  );
  const talla = document.querySelector(
    '#seleccionTalla input[name="talla"]:checked'
  );
  const cantidad = document.getElementById("cantidad");
  productoSeleccionado.cantidad = cantidad.value;
  productoSeleccionado.talla = talla ? talla?.value : "No Aplica";
  productoSeleccionado.color = color ? color.value : "No Aplica";

  carritoCompras.push(productoSeleccionado);
  sessionStorage.setItem("carrito", JSON.stringify(carritoCompras));
});
