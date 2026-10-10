export type Rol = 'ADMINISTRADOR' | 'OPERADOR' | 'CONSULTA';

// Usuario que inició sesión (datos guardados en el token JWT)
export interface Usuario {
  id_usuario: number;
  nombre: string;
  usuario: string;
  rol: Rol;
}

// Datos que se envían al iniciar sesión
export interface LoginDatos {
  usuario: string;
  contrasena: string;
}

// Respuesta del backend al iniciar sesión
export interface RespuestaLogin {
  token: string;
  usuario: Usuario;
}
