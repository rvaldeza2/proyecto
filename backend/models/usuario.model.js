const { pool } = require('../config/db');

async function findByUsuario(usuario, db = pool) {
  const [rows] = await db.query(
    'SELECT id_usuario, nombre, usuario, contrasena, rol FROM usuario WHERE usuario = ?',
    [usuario]
  );
  return rows[0] || null;
}

module.exports = { findByUsuario };
