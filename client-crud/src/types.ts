// Definir tipos para Usuario y Vehículo
export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
}

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  id_usuario: number;
  precio: number;
}

export interface Historial {
  id: number;
  id_usuario: number;
  id_vehiculo: number;
  fecha_cambio: string;
}
