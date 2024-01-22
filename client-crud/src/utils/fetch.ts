import type { Usuario, Vehiculo, Historial } from "../types";

// Función asíncrona para cargar los datos de los usuarios
export const fetchUsers = async (
  page: number,
  limit: number
): Promise<Usuario[]> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/usuarios?start=${
        (page - 1) * limit
      }&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};

export const fetchNumUsers = async (): Promise<number> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/countUsuarios`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return 0; // Retorna un valor por defecto (0) en caso de error
  }
};

export const fetchVehiculos = async (
  page: number,
  limit: number
): Promise<Vehiculo[]> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/vehiculos?start=${
        (page - 1) * limit
      }&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};

export const fetchHistorialVehiculo = async (
  id: number
): Promise<Historial[]> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/findHistoricalVehicle/${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};
