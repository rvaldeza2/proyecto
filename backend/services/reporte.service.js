const reporte = require('../models/reporte.model');
const { validarBuses } = require('./linea.service');

// RF15: reportes de estaciones, líneas y buses asignados a cada una

async function lineas() {
  const filas = await reporte.lineas();
  return filas.map((fila) => ({ ...fila, ...validarBuses(fila.estaciones, fila.buses) }));
}

const estaciones = () => reporte.estaciones();
const buses = () => reporte.buses();

module.exports = { lineas, estaciones, buses };
