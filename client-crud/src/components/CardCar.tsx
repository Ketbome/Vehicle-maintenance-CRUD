// src/components/CardCar.tsx
import React from "react";
import type { Usuario } from "../types";
import Button from "./buttons/Button.tsx";

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
    </article>
  );
};

export default CardCar;
