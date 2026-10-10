export interface ReporteLinea {
  id_linea: number;
  linea: string;
  municipalidad: string;
  distancia_total_km: number;
  estaciones: number;
  buses: number;
  minimo: number;
  maximo: number;
  cumple: boolean;
}

export interface ReporteEstacion {
  id_estacion: number;
  estacion: string;
  municipalidad: string;
  lineas: string | null;
  accesos: number;
  accesos_sin_guardia: number;
  guardias: number;
  operadores: number;
  parqueos: number;
  buses_que_la_atienden: number;
}

export interface ReporteBus {
  id_bus: number;
  placa: string;
  capacidad: number;
  linea: string | null;
  parqueo: string;
  estacion_parqueo: string;
  pilotos: string | null;
}
