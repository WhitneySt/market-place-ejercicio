const deleteData = async (url, idProducto) => {
  try {
    const opciones = {
      method: "DELETE",
    };
    const respuesta = await fetch(`${url}/${idProducto}`, opciones);
    if (!respuesta.ok) throw new Error(respuesta.statusText);
  } catch (error) {
    console.error(error);
  }
};

export default deleteData;
