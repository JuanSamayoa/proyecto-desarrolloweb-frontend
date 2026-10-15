// 1. Importar funciones y librerías, configurar ruta de APIs del Backend
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10001/api";

function App() {
  const [actividades, fijarActividades] = useState([]);
  const [progresos, fijarProgresos] = useState([]);
  const [formDatos, formFijarDatos] = useState({
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
      fijarActividades(data);
      if (data.length > 0 && !formDatos.actividad_id) {
        formFijarDatos((prev) => ({ ...prev, actividad_id: data[0].id }));
      }
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };

  const buscarProgresos = async () => {
    try {
      const res = await fetch(`${API_URL}/progresos`);
      const data = await res.json();
      fijarProgresos(data);
    } catch (error) {
      console.error("Error al obtener progresos:", error);
    }
  };

  useEffect(() => {
    buscarActividades();
    buscarProgresos();
  }, []);

  // 3. Manejar cambios en el formulario
  const manejoCambios = (e) => {
    formFijarDatos({ ...formDatos, [e.target.name]: e.target.value });
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
          edad: parseInt(formDatos.edad),
        }),
      });
      const estudiante = await resEstudiante.json();

      // Guardar puntaje / progreso
      await fetch(`${API_URL}/progresos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudiante_id: estudiante.id,
          actividad_id: parseInt(formDatos.actividad_id),
          puntaje: parseInt(formDatos.puntaje),
        }),
      });

      alert("¡Progreso de estudiante guardado con éxito!");
      formFijarDatos({
        nombre: "",
        edad: "",
        actividad_id: actividades.length > 0 ? actividades[0].id : "",
        puntaje: "100",
      });
      buscarProgresos();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="contenedor">
      <h1>Plataforma Educativa Didáctica</h1>
      <p>
        Desde esta interfaz puedes registrar estudiantes, simular la ejecución
        de actividades y consultar el reporte de progreso.
      </p>

      {/* 5. Formulario */}
      <form onSubmit={manejoEntregas} className="form">
        <h3>Registro de Estudiante y Actividad</h3>

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

      {/* 6. Tabla de Progresos */}
      <h3>Reporte de Progreso Educativo</h3>
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Edad</th>
            <th>Actividad</th>
            <th>Nivel</th>
            <th>Puntaje</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {progresos.length === 0 ? (
            <tr>
              <td colSpan="7">No hay registros disponibles aún.</td>
            </tr>
          ) : (
            progresos.map((prog) => (
              <tr key={prog.id}>
                <td>{prog.id}</td>
                <td>{prog.estudiante}</td>
                <td>{prog.edad} años</td>
                <td>{prog.actividad}</td>
                <td>{prog.nivel}</td>
                <td>{prog.puntaje} / 100</td>
                <td>{new Date(prog.fecha_ejecucion).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;