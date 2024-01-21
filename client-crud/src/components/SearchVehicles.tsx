// src/components/SearchVehicles.jsx
import React, { useState } from "react";
import type { Vehiculo, Usuario } from "../types";
import CardCar from "./CardCar.tsx";

function SearchVehicles({
  vehiculos,
  usuarios,
}: {
  vehiculos: Vehiculo[];
  usuarios: Usuario[];
}) {
  const [filtro, setFiltro] = useState("");
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState(vehiculos);

  const handleSearch = (e) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setFiltro(valorBusqueda);

    const filtrados = vehiculos.filter(
      (vehiculo) =>
        vehiculo.marca.toLowerCase().includes(valorBusqueda) ||
        vehiculo.modelo.toLowerCase().includes(valorBusqueda) ||
        vehiculo.anio.toString().includes(valorBusqueda)
    );
    setVehiculosFiltrados(filtrados);
  };

  return (
    <section className="w-full">
      <article className="flex flex-col items-center justify-center w-full h-full gap-3 pb-10">
        <div className="relative mb-4 flex flex-wrap items-stretch w-1/2">
          <input
            type="search"
            className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-whiet focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={filtro}
            onChange={handleSearch}
          />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
            </svg>
          </span>
        </div>
        {vehiculosFiltrados.map((vehiculo) => (
          <CardCar
            key={vehiculo.id}
            id={vehiculo.id}
            marca={vehiculo.marca}
            modelo={vehiculo.modelo}
            anio={vehiculo.anio}
            precio={vehiculo.precio}
            user={usuarios.find((user) => user.id === vehiculo.id_usuario)}
            usuarios={usuarios}
          />
        ))}
      </article>
    </section>
  );
}

export default SearchVehicles;
