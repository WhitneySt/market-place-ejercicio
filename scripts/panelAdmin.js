import { obtenerProductos } from "../modules/services.js";
import { mostrarModal, pintarPanelProductos, insertarFormulario } from "../modules/uiPanel.js";

const botonRegresar = document.getElementById("regresar");
const contenedorProductos = document.querySelector("main");
const botonAgregar = document.getElementById("agregarProducto");

botonRegresar.addEventListener("click", () => {
  location.href = "../index.html";
});

botonAgregar.addEventListener("click", () => {
  mostrarModal(insertarFormulario);
});

document.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos();
  pintarPanelProductos(productos, contenedorProductos);
  console.log(productos);
});
