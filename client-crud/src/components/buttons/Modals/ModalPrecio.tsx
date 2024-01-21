// src/components/ModalCambioPrecio.tsx
import React, { useState } from "react";

interface ModalCambioPrecioProps {
  id: number;
  isOpen: boolean;
  precio: number;
  isOpenSetter: (isOpen: boolean) => void;
}

const ModalCambioPrecio: React.FC<ModalCambioPrecioProps> = ({
  id,
  isOpen,
  precio,
  isOpenSetter,
}) => {
  if (!isOpen) return null;
  const [nuevoPrecio, setNuevoPrecio] = useState(Number(precio));

  const cambiarPrecio = async (id: number) => {
    const precio = document.getElementById("nuevoPrecio").value;
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/vehiculos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ precio: precio }),
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

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoPrecio(Number(e.target.value));
  };

  return (
    <div
      id="cambioPrecio"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-4/6 md:w-2/5">
          <h2 className="text-lg font-bold">Cambiar Dueño</h2>
          <form id="formCambioPrecio" data-id={id}>
            <div className="flex flex-col pb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ingresa el nuevo valor:
              </label>
              <input
                type="number"
                value={nuevoPrecio}
                id="nuevoPrecio"
                name="nuevoPrecio"
                onChange={handlePrecioChange}
                min="0"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="confirm-precio bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => cambiarPrecio(id)}
              >
                Cambiar
              </button>
              <button
                type="button"
                className="cancel-precio bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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

export default ModalCambioPrecio;
