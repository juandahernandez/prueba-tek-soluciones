const fetch = require("node-fetch");

const { Covid } = require("../models/covid.model");

async function covidServiceTime() {
  const response = await fetch(
    "https://www.datos.gov.co/resource/gt2j-8ykr.json"
  );

  const data = await response.json();

  // const newData = data.reduce(
  //   (accumulado, iteracion) => [
  //     ...accumulado,
  //     {
  //       id: iteracion.id_de_caso,
  //       genero: iteracion.sexo,
  //       edad: iteracion.edad,
  //       ciudad: iteracion.ciudad_municipio_nom,
  //       estado: iteracion.estado,
  //     },
  //   ],
  //   []
  // );

  const newData = [];

  data.map((iteracion) =>
    newData.push({
      id: iteracion.id_de_caso,
      sexo: iteracion.sexo,
      edad: iteracion.edad,
      ciudad: iteracion.ciudad_municipio_nom,
      estado: iteracion.estado,
    })
  );

  let findId = await Covid.findAll();

  const dbSave =
    newData.filter((item) => !findId.find((ele) => ele.id === item.id)) || [];

  dbSave.map(async (item) => await Covid.create(item));

  console.log("Finish cron covid service", dbSave);

  return { status: 200, success: true, response: dbSave };
}

module.exports = {
  covidServiceTime,
};
