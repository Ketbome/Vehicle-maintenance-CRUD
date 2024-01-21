import type { Usuario, Vehiculo } from "../types";

// Función asíncrona para cargar los datos de los usuarios
export const fetchUsers = async (
  page: number,
  limit: number
): Promise<Usuario[]> => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/usuarios?start=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchNumUsers = async (): Promise<number> => {
  const response = await fetch(`http://127.0.0.1:8000/api/countUsuarios`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchVehiculos = async (
  page: number,
  limit: number
): Promise<Vehiculo[]> => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/vehiculos?start=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchHistorialVehiculo = async (
  id: number
): Promise<Vehiculo[]> => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/findHistoricalVehicle/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
