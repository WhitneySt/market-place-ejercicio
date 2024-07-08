//Pintar botones de filtrado por categoría

import { obtenerCategorias, obtenerProductos } from "../modules/services.js"
import { pintarBotonesFiltrado, pintarProductos } from "../modules/ui.js";

const contenedorFiltros = document.getElementById('filtros');
const contenedorProductos = document.getElementById('contenedorProductos');


document.addEventListener('DOMContentLoaded', async () => {
    const categorias = await obtenerCategorias();
    const productos = await obtenerProductos();
    pintarBotonesFiltrado(categorias, contenedorFiltros, contenedorProductos);
    pintarProductos(productos, contenedorProductos)
    console.log(categorias);
    console.log(productos);
})