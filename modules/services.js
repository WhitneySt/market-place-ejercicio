import createData from "../helpers/createData.js";
import deleteData from "../helpers/deleteData.js";
import getData from "../helpers/getData.js";
import updateData from "../helpers/updateData.js";
import { endpoints } from "./endpoints.js";

export async function obtenerCategorias() {
  try {
    const categorias = await getData(endpoints.categorias);
    return categorias;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtenerProductos() {
  try {
    const productos = await getData(endpoints.productos);
    return productos;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtenerProductosFiltrados(categoria) {
  try {
    const productos = await obtenerProductos();
    const filtrados = productos.filter((item) =>
      item.categorias.includes(categoria)
    );
    return filtrados;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtenerProductoPorId(idProducto) {
  try {
    const url = `${endpoints.productos}/${idProducto}`;
    const producto = await getData(url);
    return producto;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarProducto(idProducto) {
  try {
    await deleteData(endpoints.productos, idProducto);
    alert("El producto se ha eliminado exitosamente");
    return await obtenerProductos();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function crearProducto(nuevoProducto) {
  try {
    const respuesta = await createData(endpoints.productos, nuevoProducto);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function editarProducto(idProducto, productoEditado) {
  try {
    const url=`${endpoints.productos}/${idProducto}`
    const respuesta = await updateData(url, productoEditado)
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function convertirImagenABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
