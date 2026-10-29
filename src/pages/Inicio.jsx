// 1. Importar funciones y librerías, configurar ruta de APIs del Backend
import { useState, useEffect } from "react";
import "../App.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://dw-api-backend-2026-gmd6hmbzb6crf9cd.mexicocentral-01.azurewebsites.net/api";

function Inicio() {
  const [actividades, setActividades] = useState([]);
  const [formDatos, setFormDatos] = useState({
    nombre: "",
    edad: "",
    actividad_id: "",
    puntaje: "100",
  });

  // 2. Cargar actividades y progresos de la BD
  const buscarActividades = async () => {
    try {
      const res = await fetch(`${API_URL}/actividades`);
      const data = await res.json();
      setActividades(data);
      if (data.length > 0 && !formDatos.actividad_id) {
        setFormDatos((prev) => ({ ...prev, actividad_id: data[0].id }));
      }
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };

  useEffect(() => {
    buscarActividades();
  }, []);

  // 3. Manejar cambios en el formulario
  const manejoCambios = (e) => {
    setFormDatos({ ...formDatos, [e.target.name]: e.target.value });
  };

  // 4. Crear registro de estudiante y guardar progreso
  const manejoEntregas = async (e) => {
    e.preventDefault();
    if (!formDatos.nombre || !formDatos.edad || !formDatos.actividad_id) {
      return alert("Nombre, edad y actividad son requeridos");
    }

    try {
      // Registrar estudiante
      const resEstudiante = await fetch(`${API_URL}/estudiantes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formDatos.nombre,
          edad: Number.parseInt(formDatos.edad),
        }),
      });
      const estudiante = await resEstudiante.json();

      // Guardar puntaje / progreso
      await fetch(`${API_URL}/progresos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudiante_id: estudiante.id,
          actividad_id: Number.parseInt(formDatos.actividad_id),
          puntaje: Number.parseInt(formDatos.puntaje),
        }),
      });

      alert("¡Progreso de estudiante guardado con éxito!");
      setFormDatos({
        nombre: "",
        edad: "",
        actividad_id: actividades.length > 0 ? actividades[0].id : "",
        puntaje: "100",
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Plataforma Educativa Didáctica</h1>
      <p className="texto-secundario">
        Desde esta interfaz puedes registrar estudiantes, simular la ejecución
        de actividades y consultar el reporte de progreso.
      </p>

      {/* 5. Formulario */}
      <form onSubmit={manejoEntregas} className="form">
        <h2 className="subtitulo">Registro de Estudiante y Actividad</h2>

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
          value={formDatos.edad}
          onChange={manejoCambios}
          required
        />

        <select
          name="actividad_id"
          value={formDatos.actividad_id}
          onChange={manejoCambios}
          required
        >
          <option value="">Seleccione una actividad</option>
          {actividades.map((act) => (
            <option key={act.id} value={act.id}>
              [{act.nivel}] - {act.titulo} ({act.categoria})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="puntaje"
          min="0"
          max="100"
          placeholder="Puntuación Obtenida (0-100)"
          value={formDatos.puntaje}
          onChange={manejoCambios}
          required
        />

        <div className="btn-formulario">
          <button type="submit" className="btn btn-guardar">
            Guardar Progreso
          </button>
        </div>
      </form>

    </div>
  );
}

export default Inicio;