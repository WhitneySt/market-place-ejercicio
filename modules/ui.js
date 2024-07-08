import { obtenerProductosFiltrados } from "./services.js";

export function pintarBotonesFiltrado(
  listaCategorias,
  contenedor,
  contenedorProductos
) {
  contenedor.innerHTML = "";
  listaCategorias.forEach((categoria) => {
    const li = document.createElement("li");
    const boton = document.createElement("button");
    const imagen = document.createElement("img");
    const h2 = document.createElement("h2");

    imagen.setAttribute("src", `../assets/${categoria.imagen}`);
    imagen.setAttribute("alt", categoria.nombre);
    h2.textContent = categoria.nombre;
    boton.style.backgroundColor = categoria.color;
    li.classList.add("categoria");

    li.addEventListener("click", async () => {
      const resultadoFiltro = await obtenerProductosFiltrados(categoria.nombre);
      pintarProductos(resultadoFiltro, contenedorProductos);
    });

    boton.appendChild(imagen);
    li.appendChild(boton);
    li.appendChild(h2);
    contenedor.appendChild(li);
  });
}

export function pintarProductos(listaProductos, contenedor) {
  contenedor.innerHTML = "";
  listaProductos.forEach((producto) => {
    const card = document.createElement("article");
    const figure = document.createElement("figure");
    const imagen = document.createElement("img");
    const h3 = document.createElement("h3");
    const div = document.createElement("div");

    imagen.setAttribute("src", producto.imagenes[0]);
    imagen.setAttribute("alt", producto.nombre);
    h3.textContent = producto.nombre;

    div.innerHTML = `
        <figure><img src="../assets/star.svg" alt="estrella"><figcaption>${producto.puntuacion}</figcaption></figure>
        <span>$ ${producto.precioUnitario}</span>
        `;
    card.classList.add("card");
    card.addEventListener("click", () => {
      sessionStorage.setItem("idProducto", producto.id);
      window.location.href = "/pages/detalles.html";
    });

    figure.appendChild(imagen);
    card.appendChild(figure);
    card.appendChild(h3);
    card.appendChild(div);
    contenedor.appendChild(card);
  });
}
