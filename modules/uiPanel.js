import {
  convertirImagenABase64,
  crearProducto,
  editarProducto,
  eliminarProducto,
  obtenerCategorias,
  obtenerProductos,
} from "../modules/services.js";
import { isObject } from "./uiDetalles.js";

export function pintarPanelProductos(listaProductos, contenedor) {
  contenedor.innerHTML = "";
  listaProductos.forEach((element) => {
    const fila = document.createElement("article");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const h2 = document.createElement("h3");
    const section1 = document.createElement("section");
    const section2 = document.createElement("section");
    const div = document.createElement("div");
    const botonEditar = document.createElement("button");
    const botonEliminar = document.createElement("button");
    const span = document.createElement("span");
    const span2 = document.createElement("span");

    span2.textContent = `$${element.precioUnitario}`;
    img.setAttribute("src", element.imagenes[0]);
    img.setAttribute("alt", element.nombre);
    h2.textContent = element.nombre;
    botonEditar.textContent = "Editar";
    botonEliminar.textContent = "Eliminar";

    element.categorias.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item;
      span.appendChild(p);
    });

    botonEliminar.addEventListener("click", async () => {
      const confirmacion = confirm(
        "¿Está seguro que desea eliminar este producto?"
      );
      if (confirmacion) {
        const productos = await eliminarProducto(element.id);
        pintarPanelProductos(productos, contenedor);
      }
    });
    botonEditar.addEventListener("click", () => {
      mostrarModal(insertarFormulario, contenedor, element);
    });

    fila.classList.add("tarjeta");
    section1.appendChild(h2);
    section1.appendChild(span2);
    div.appendChild(botonEditar);
    div.appendChild(botonEliminar);
    section2.appendChild(span);
    section2.appendChild(div);
    figure.appendChild(img);
    fila.appendChild(figure);
    fila.appendChild(section1);
    fila.appendChild(section2);
    contenedor.appendChild(fila);
  });
}

export function mostrarModal(
  callback,
  contenedor = "",
  parametroCallback = false
) {
  const div = document.createElement("div");
  const article = document.createElement("article");
  const botonCierre = document.createElement("button");

  botonCierre.innerHTML = "&times;";
  botonCierre.addEventListener("click", () => {
    document.body.removeChild(div);
  });
  botonCierre.classList.add("cerrar");

  callback(article, contenedor, parametroCallback);

  div.classList.add("modal");
  article.appendChild(botonCierre);
  div.appendChild(article);
  document.body.appendChild(div);
}

function cerrarModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    document.body.removeChild(modal);
  }
}

export async function insertarFormulario(
  contenedor,
  contenedorProductos,
  editar = false
) {
  const categorias = await obtenerCategorias();
  const form = document.createElement("form");
  const boton = document.createElement("button");
  const div = document.createElement("div");
  const incremento = document.createElement("button");
  const decremento = document.createElement("button");
  const inputCantidad = document.createElement("input");

  const labelCategoria = document.createElement("label");
  const select = document.createElement("select");
  const primeraOpcion = document.createElement("option");
  primeraOpcion.textContent = "Seleccione una opción";
  primeraOpcion.value = "";
  select.appendChild(primeraOpcion);

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.textContent = categoria.nombre;
    option.value = categoria.nombre;
    select.appendChild(option);
  });

  labelCategoria.textContent = "Categorías";
  select.id = "categorias";
  select.setAttribute("name", "categorias");
  labelCategoria.setAttribute("for", select.id);

  boton.setAttribute("type", "submit");
  incremento.setAttribute("type", "button");
  decremento.setAttribute("type", "button");
  incremento.textContent = "+";
  decremento.textContent = "-";
  inputCantidad.setAttribute("value", "1");
  inputCantidad.setAttribute("type", "number");
  inputCantidad.setAttribute("readonly", true);
  inputCantidad.setAttribute("name", "cantidadEnStock");
  inputCantidad.id = "cantidadEnStock";

  incremento.addEventListener("click", () => {
    inputCantidad.value++;
  });

  decremento.addEventListener("click", () => {
    if (inputCantidad.value > "1") {
      inputCantidad.value--;
    }
  });

  boton.textContent = "Enviar";

  form.innerHTML = `
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ingrese el nombre del producto">

        <label for="description">Descripción</label>
        <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción del producto">
        <label for="precioUnitario">Precio unitario</label>
        <input type="text" id="precioUnitario" name="precioUnitario" placeholder="Ingrese el precio unitario del producto">

        <div>
            <figure>
                <img id="imagen" src="https://d1eipm3vz40hy0.cloudfront.net/images/SSAC-Blog/mercadotecnia-marketing-productos.jpg" alt="imagen producto">
            </figure>
            <label for="imagenes">Imagen Producto</label>
            <input type="file" id="imagenes" name="imagenes">
        </div>
        
        <label>Cantidad</label>
    `;

  const inputImagen = form.querySelector("#imagenes");
  inputImagen.addEventListener("change", (evento) => {
    const imagen = form.querySelector("#imagen");
    const urlImagen = URL.createObjectURL(evento.target.files[0]);
    imagen.setAttribute("src", urlImagen);
  });
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    try {
      const datosDelFormulario = obtenerDatosFormulario(form);
      const imagenProducto = await convertirImagenABase64(
        datosDelFormulario.imagenes
      );
      console.log(datosDelFormulario.imagenes.size);
      datosDelFormulario.imagenes = datosDelFormulario.imagenes.size
        ? [imagenProducto]
        : editar.imagenes[0] || "";
      datosDelFormulario.categorias = [datosDelFormulario.categorias];
      datosDelFormulario.puntuacion =
        editar && editar?.puntuacion ? editar.puntuacion : 0;
      console.log(datosDelFormulario);
      if (editar) {
        const respuesta = await editarProducto(editar.id, datosDelFormulario);
        if (respuesta) alert("Producto editado con éxito");
        console.log(respuesta);
      } else {
        const respuesta = await crearProducto(datosDelFormulario);
        if (respuesta) alert("Producto creado con éxito");
      }
      const productos = await obtenerProductos();
      pintarPanelProductos(productos, contenedorProductos);
      cerrarModal();
    } catch (error) {
      console.error(error);
    }
  });
  form.classList.add("formulario");
  div.classList.add("contador");
  div.appendChild(decremento);
  div.appendChild(inputCantidad);
  div.appendChild(incremento);
  form.appendChild(div);
  form.appendChild(labelCategoria);
  form.appendChild(select);
  form.appendChild(boton);
  contenedor.appendChild(form);

  if (editar) {
    console.log(editar);
    imagen.setAttribute("src", editar.imagenes[0]);
    const inputs = form.querySelectorAll("input, select");
    for (const item of inputs) {
      console.log(item.name);
      item.value =
        item.type === "file"
          ? ""
          : Array.isArray(editar[item.id])
          ? editar[item.id][0]
          : isObject(editar[item.id])
          ? 1
          : editar[item.id];
    }
  }
}

export function obtenerDatosFormulario(formulario) {
  const datosFormulario = {};
  const dataForm = new FormData(formulario);
  console.log(dataForm);
  for (const [nombrePropiedad, valorPropiedad] of dataForm.entries()) {
    datosFormulario[nombrePropiedad] = valorPropiedad;
  }

  return datosFormulario;
}
