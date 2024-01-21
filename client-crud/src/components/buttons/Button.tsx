// src/components/ButtonDelete.tsx
import React, { useState } from "react";
import ModalCambioDuenio from "./Modals/ModalDuenio.tsx";
import ModalCambioPrecio from "./Modals/ModalPrecio.tsx";
import type { Usuario } from "../../types.ts";

interface ButtonProps {
  id: number;
  nombre: string;
  icon: string;
  type: number;
  precio: number;
  usuarios: Usuario[];
}

const Button: React.FC<ButtonProps> = ({
  id,
  nombre,
  icon,
  type,
  precio,
  usuarios,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPrecio, setIsModalOpenPrecio] = useState(false);
  const cambiarDuenio = () => {
    setIsModalOpen(true);
  };

  const cambiarPrecio = () => {
    setIsModalOpenPrecio(true);
  };

  const eliminarVehiculo = async (id: number) => {
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/vehiculos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al eliminar el auto");
      }

      alert("Auto eliminado con éxito");

      location.reload();
    } catch (error) {
      console.error("Hubo un error al eliminar el auto:", error);
    }
  };

  const handleClick = () => {
    switch (type) {
      case 1:
        cambiarDuenio();
        break;
      case 2:
        cambiarPrecio();
        break;
      case 3:
        eliminarVehiculo(id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full">
      <a
        className="delete flex-row justify-center text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100"
        onClick={handleClick}
      >
        <img src={icon} alt={nombre} className="invert" />
        {nombre}
      </a>
      {isModalOpen && (
        <ModalCambioDuenio
          id={id}
          usuarios={usuarios}
          isOpen={isModalOpen}
          isOpenSetter={setIsModalOpen}
        />
      )}
      {isModalOpenPrecio && (
        <ModalCambioPrecio
          id={id}
          isOpen={isModalOpenPrecio}
          precio={precio}
          isOpenSetter={setIsModalOpenPrecio}
        />
      )}
    </div>
  );
};

export default Button;
