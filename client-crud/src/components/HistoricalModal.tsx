// src/components/HistorialDueniosModal.jsx
import React from "react";
import type { Historial, Usuario } from "../types";

interface HistoricalModalProps {
  isOpen: boolean;
  onClose: () => void;
  historial: Historial[];
  usuarios: Usuario[];
}

const HistoricalModal = ({
  isOpen,
  onClose,
  historial,
  usuarios,
}: HistoricalModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="flex items-center justify-center min-h-screen w-200">
        <div className="relative max-h-3/5 overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de Cambio
                </th>
              </tr>
            </thead>
            <tbody>
              {historial.map((historia) => (
                <tr
                  key={historia.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {
                      usuarios.find((user) => user.id === historia.id_usuario)
                        ?.nombre
                    }{" "}
                    {
                      usuarios.find((user) => user.id === historia.id_usuario)
                        ?.apellidos
                    }
                  </td>
                  <td className="px-6 py-4">{historia.fecha_cambio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <button
              className="flex-row justify-center text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-100 hover:opacity-100"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalModal;
