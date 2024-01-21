// src/components/CardCar.tsx
import React, { useState } from "react";
import type { Usuario, Historial } from "../types";
import Button from "./buttons/Button.tsx";
import HistoricalModal from "./HistoricalModal.tsx";
import { fetchHistorialVehiculo } from "../utils/fetch.ts";

interface CardCarProps {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  user: Usuario;
  usuarios: Usuario[];
}

const CardCar: React.FC<CardCarProps> = ({
  id,
  marca,
  modelo,
  anio,
  precio,
  user,
  usuarios,
}) => {
  const [isModalHistorialOpen, setIsModalHistorialOpen] = useState(false);
  const [historialData, setHistorialData] = useState([]);
  const [users, setUsers] = useState([]);

  function obtenerNombreUsuarioPorId(idUsuario: number, usuarios: Usuario[]) {
    const usuario = usuarios.find((usuario) => usuario.id === idUsuario);
    return usuario;
  }

  const abrirModalHistorial = async () => {
    const historial = await fetchHistorialVehiculo(id);
    historial.forEach((element) => {
      const user = obtenerNombreUsuarioPorId(element.id_usuario, usuarios);
      setUsers((users) => [...users, user]);
    });
    setHistorialData(historial);
    setIsModalHistorialOpen(true);
  };

  const precioCLP = Number(precio).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  });

  return (
    <article className="flex flex-col bg-gray-700 hover:bg-gray-600 transition-colors duration-300 p-2 rounded-lg shadow-lg w-3/4 :w-1/2 items-center pt-4">
      <img src={`/assets/${marca}.svg`} alt={marca} className="w-20 invert" />
      <div className="flex flex-col items-center gap-3 px-10 text-2xl py-4">
        <p>
          {marca} - {modelo} - {anio}
        </p>
        <p className="text-green-400">{precioCLP}</p>
      </div>
      <p className="text-gray-300 text-center">
        Dueño:{" "}
        <strong>
          {user.nombre} {user.apellidos}
        </strong>
      </p>
      <p className="text-gray-300 text-center mb-4">
        Contacto: <strong>{user.email}</strong>
      </p>
      <div className="flex flex-row justify-between gap-4 items-center">
        <Button
          id={id}
          nombre="Cambiar Dueño"
          icon="/assets/icons/change.svg"
          type={1}
          precio={precio}
          usuarios={usuarios}
        />
        <Button
          id={id}
          nombre="Cambiar Precio"
          icon="/assets/icons/changeData.svg"
          type={2}
          precio={precio}
          usuarios={usuarios}
        />
        <Button
          id={id}
          nombre="Eliminar"
          icon="/assets/icons/delete.svg"
          type={3}
          precio={precio}
          usuarios={usuarios}
        />
      </div>
      <a
        className="flex-row justify-center text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100"
        onClick={abrirModalHistorial}
      >
        <img
          src="/assets/icons/historical.svg"
          alt="Historial de dueños"
          className="invert"
        />
        Historial de dueños
      </a>
      {isModalHistorialOpen && (
        <HistoricalModal
          isOpen={isModalHistorialOpen}
          onClose={() => setIsModalHistorialOpen(false)}
          historial={historialData}
          usuarios={users}
        />
      )}
    </article>
  );
};

export default CardCar;
