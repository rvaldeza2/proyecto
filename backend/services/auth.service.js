const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario.model');
const { HttpError, requireFields } = require('./base.service');

const ROLES = { ADMINISTRADOR: 'ADMINISTRADOR', OPERADOR: 'OPERADOR', CONSULTA: 'CONSULTA' };

// RNF04: valida usuario y contraseña (bcrypt) y entrega un token JWT con el rol
async function login(data) {
  requireFields(data, ['usuario', 'contrasena']);
  const encontrado = await usuario.findByUsuario(data.usuario);
  const valida = encontrado && (await bcrypt.compare(data.contrasena, encontrado.contrasena));
  if (!valida) throw new HttpError(401, 'Usuario o contraseña incorrectos');

  const datos = {
    id_usuario: encontrado.id_usuario,
    nombre: encontrado.nombre,
    usuario: encontrado.usuario,
    rol: encontrado.rol,
  };
  const token = jwt.sign(datos, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRA || '8h' });
  return { token, usuario: datos };
}

// Devuelve los datos del usuario guardados en el token, o lanza 401 si no es válido
function verificarToken(token) {
  try {
    const { id_usuario, nombre, usuario: nombreUsuario, rol } = jwt.verify(token, process.env.JWT_SECRET);
    return { id_usuario, nombre, usuario: nombreUsuario, rol };
  } catch {
    throw new HttpError(401, 'La sesión no es válida o ha expirado; inicie sesión nuevamente');
  }
}

module.exports = { ROLES, login, verificarToken };
