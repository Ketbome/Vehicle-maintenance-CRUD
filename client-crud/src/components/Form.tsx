// src/components/AddVehicleForm.jsx
import React, { useState } from "react";
import { addVehiculo } from "../utils/fetch.ts";

function Form() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [id_usuario, setIdUsuario] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async () => {
    console.log("submit");
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const anio = document.getElementById("anio").value;
    const id_usuario = document.getElementById("id_usuario").value;
    const precio = document.getElementById("precio").value;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vehiculos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marca: marca,
          modelo: modelo,
          anio: anio,
          precio: precio,
          id_usuario: id_usuario,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Vehiculo agregado correctamente");
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const marcas = [
    "Toyota",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Tesla",
    "Volkswagen",
    "Mercedes-Benz",
    "BMW",
    "Honda",
  ];

  return (
    <form className="flex flex-col max-w-80 items-center justify-center">
      <select
        id="marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        required
      >
        <option value="">Selecciona una marca</option>
        {marcas.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
      </select>
      <input
        id="modelo"
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        placeholder="Modelo"
        required
      />
      <input
        id="anio"
        type="number"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
        placeholder="Año"
        required
      />
      <input
        id="id_usuario"
        type="number"
        value={id_usuario}
        onChange={(e) => setIdUsuario(e.target.value)}
        placeholder="ID del Usuario"
        required
      />
      <input
        id="precio"
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
        required
      />
      <button
        className="flex-row justify-center text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100"
        onClick={() => handleSubmit()}
      >
        Agregar Vehículo
      </button>
    </form>
  );
}

export default Form;
