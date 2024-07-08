import { obtenerProductoPorId } from "../modules/services.js";

export function isObject(value) {
  return value !== null && typeof value === "object";
}

export function pintarImagenes(listaImagenes, contenedor) {
  contenedor.innerHTML = "";
  listaImagenes.forEach((imagen, indice) => {
    const img = document.createElement("img");

    img.setAttribute("src", imagen);
    img.setAttribute("alt", `Imagen No. ${indice + 1}`);

    contenedor.appendChild(img);
  });
}

export function pintarColorYTallasDisponibles(
  stock,
  contenedorTallas,
  contenedorColores
) {
  contenedorTallas.innerHTML = "";
  contenedorColores.innerHTML = "";
  if (isObject(stock)) {
    const div = document.createElement("div");
    const divColores = document.createElement("div");
    const label = document.createElement("label");
    const labelColores = document.createElement("label");

    label.textContent = "Tallas";

    for (const talla in stock) {
      const cantidadTallas = stock[talla];

      if (isObject(cantidadTallas)) {
        labelColores.textContent = "Color";
        for (const color in cantidadTallas) {
          crearSelector(color, divColores);
        }
      }

      crearSelector(talla, div);
    }
    if (divColores.children.length > 0) {
      const inputColor = divColores.querySelector('input[name="color"]');
      inputColor.setAttribute("checked", true);

      contenedorColores.appendChild(labelColores);
      contenedorColores.appendChild(divColores);
    }

    const inputTalla = div.querySelector('input[name="talla"]');
    inputTalla.setAttribute("checked", true);
    contenedorTallas.appendChild(label);
    contenedorTallas.appendChild(div);
  }
}

export function crearSelector(valor, contenedor) {
  const colores = {
    blanco: "#FFF",
    negro: "#000000",
    otro: "#00000000",
    marrón: "#904000",
    rojo: "#FA081E",
    verde: "#75F575 ",
    azul: "#A6DDF7",
  };
  const contenedorArray = Array.from(contenedor.children);
  const existe = contenedorArray.some((item) => item.id === valor);
  if (!existe) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    let name = "";
    if (isNaN(valor) && valor.length > 2) {
      label.style.backgroundColor = colores[valor] || colores.otro;
      name = "color";
    } else {
      label.textContent = valor;
      name = "talla";
    }

    input.setAttribute("type", "radio");
    input.setAttribute("name", name);
    input.value = valor;
    input.id = valor;

    label.setAttribute("for", valor);
    contenedor.appendChild(input);
    contenedor.appendChild(label);
  }
}

export function pintarDetalles(producto) {
  const categoria = document.getElementById("categoria");
  const imagenesProducto = document.getElementById("imagenes");
  const contenedorPrecio = document.getElementById("precio");
  const contenedorNombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const puntuacion = document.getElementById("puntuacion");
  const colores = document.getElementById("seleccionColor");
  const tallas = document.getElementById("seleccionTalla");

  categoria.textContent = producto.categorias[0];
  contenedorPrecio.textContent = `$${producto.precioUnitario}`;
  contenedorNombre.textContent = producto.nombre;
  descripcion.textContent = producto.descripcion;
  puntuacion.textContent = producto.puntuacion;
  pintarImagenes(producto.imagenes, imagenesProducto);
  pintarColorYTallasDisponibles(producto.cantidadEnStock, tallas, colores);
}

export function contadorTotal(precioUnitario) {
  const botonDecrementar = document.getElementById("decrementar");
  const botonIncrementar = document.getElementById("incrementar");
  const cantidadAComprar = document.getElementById("cantidad");
  const total = document.getElementById("total");
  total.textContent = `$${cantidadAComprar.value * precioUnitario}`;

  botonDecrementar.addEventListener("click", () => {
    if (cantidadAComprar.value > 1) {
      cantidadAComprar.value--;
      total.textContent = `$${cantidadAComprar.value * precioUnitario}`;
    } else {
      botonDecrementar.setAttribute("disabled", true);
    }
  });

  botonIncrementar.addEventListener("click", () => {
    cantidadAComprar.value++;
    total.textContent = `$${cantidadAComprar.value * precioUnitario}`;
  });
}
