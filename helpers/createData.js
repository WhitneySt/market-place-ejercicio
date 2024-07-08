const createData = async (url, nuevoDato) => {
  try {
    const opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoDato),
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

export default createData;
