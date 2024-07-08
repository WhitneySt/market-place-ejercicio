const updateData = async (url, datoEditado) => {
  try {
    const opciones = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datoEditado),
    };
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) throw new Error(respuesta.statusText);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default updateData;
