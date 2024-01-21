// src/components/ModalCambioDuenio.tsx
import React from "react";
import type { Usuario } from "../../../types";

interface ModalCambioDuenioProps {
  id: number;
  usuarios: Usuario[];
  isOpen: boolean;
  isOpenSetter: (isOpen: boolean) => void;
}

const ModalCambioDuenio: React.FC<ModalCambioDuenioProps> = ({
  id,
  usuarios,
  isOpen,
  isOpenSetter,
}) => {
  if (!isOpen) return null;

  const cambiarDuenio = async (id: number) => {
    const id_usuario = document.getElementById("nuevoDuenio").value;
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/vehiculos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_usuario: id_usuario }),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al eliminar el auto");
      }

      isOpenSetter(false);
    } catch (error) {
      console.error("Hubo un error al eliminar el auto:", error);
    }
  };

  return (
    <div
      id="cambioDuenioModal"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-4/6 md:w-2/5">
          <h2 className="text-lg font-bold">Cambiar Dueño</h2>
          <form id="formCambioDuenio" data-id={id}>
            <div className="flex flex-col pb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Selecciona un dueño:
              </label>
              <select
                id="nuevoDuenio"
                name="nuevoDuenio"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {usuarios.map((usuario) => (
                  <option value={usuario.id} key={usuario.id}>
                    {usuario.nombre} {usuario.apellidos}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="confirm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => cambiarDuenio(id)}
              >
                Cambiar
              </button>
              <button
                type="button"
                className="cancel bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => isOpenSetter(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCambioDuenio;
