const getData = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(respuesta.statusText);

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
