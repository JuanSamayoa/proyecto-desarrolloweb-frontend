// 1. Importar funciones y librerías, configurar ruta de APIs del Backend
import { useState } from "react";
import "../App.css";
import { guardarEstudiante } from "../components/SelectorEstudiante";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "/api"
    : "https://dw-api-backend-2026-gmd6hmbzb6crf9cd.mexicocentral-01.azurewebsites.net/api");

function Inicio() {
  const [formDatos, setFormDatos] = useState({
    nombre: "",
    edad: "",
  });

  // Manejar cambios en el formulario
  const manejoCambios = (e) => {
    setFormDatos({ ...formDatos, [e.target.name]: e.target.value });
  };

  // Crear registro de estudiante
  const manejoEntregas = async (e) => {
    e.preventDefault();
    if (!formDatos.nombre || !formDatos.edad) {
      return alert("Nombre y edad son requeridos");
    }

    try {
      // Registrar estudiante
      const respuesta = await fetch(`${API_URL}/estudiantes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formDatos.nombre,
          edad: Number.parseInt(formDatos.edad),
        }),
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(datos.error || "No se pudo registrar el estudiante");
      }

      guardarEstudiante(datos);

      alert("¡Estudiante registrado correctamente!");
      setFormDatos({
        nombre: "",
        edad: "",
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo registrar el estudiante. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Plataforma Educativa Didáctica</h1>
      <p className="texto-secundario">
        Desde esta interfaz puedes registrar estudiantes
      </p>

      {/* 5. Formulario */}
      <form onSubmit={manejoEntregas} className="form">
        <h2 className="subtitulo">Registro de Estudiante</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del estudiante"
          value={formDatos.nombre}
          onChange={manejoCambios}
          required
        />

        <input
          type="number"
          name="edad"
          placeholder="Edad (Años)"
          min="1"
          max="99"
          value={formDatos.edad}
          onChange={manejoCambios}
          required
        />

        <div className="btn-formulario">
          <button type="submit" className="btn btn-guardar">
            Registrar Estudiante
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inicio;
