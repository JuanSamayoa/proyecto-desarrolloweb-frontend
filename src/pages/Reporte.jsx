import { useEffect, useState } from "react";
import "../App.css";
import { obtenerEstudiantes } from "../components/SelectorEstudiante";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "/api"
    : "https://dw-api-backend-2026-gmd6hmbzb6crf9cd.mexicocentral-01.azurewebsites.net/api");

const nombresActividades = {
  "Conocimientos Espaciales": "Conocimientos Espaciales",
  "Figuras Geométricas": "Reconocer Figuras Geométricas",
  "Juego de Memoria": "Juego de Memoria",
  "Tablas de Multiplicar": "Tablas de Multiplicar",
  "Suma de Fracciones": "Suma de Quebrados",
  "Multiplicación con Decimales": "Multiplicación con Decimales",
};

function Reporte() {
  const [progresos, fijarProgresos] = useState([]);
  const [estudiantes] = useState(obtenerEstudiantes);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");

  useEffect(() => {
    const buscarProgresos = async () => {
      try {
        const filtro = estudianteSeleccionado
          ? `?estudiante_id=${estudianteSeleccionado}`
          : "";
        const res = await fetch(`${API_URL}/progresos${filtro}`);
        if (!res.ok) {
          throw new Error("No se pudo consultar el reporte");
        }
        const data = await res.json();
        fijarProgresos(data);
      } catch (error) {
        console.error("Error al obtener progresos:", error);
      }
    };

    buscarProgresos();
  }, [estudianteSeleccionado]);

  return (
    <main className="reporte">
      <h3>Reporte de Progreso Educativo</h3>
      <div className="filtro-reporte">
        <label htmlFor="filtro-estudiante">Filtrar por estudiante</label>
        <select
          id="filtro-estudiante"
          value={estudianteSeleccionado}
          onChange={(e) => setEstudianteSeleccionado(e.target.value)}
        >
          <option value="">Todos los estudiantes</option>
          {estudiantes.map((estudiante) => (
            <option key={estudiante.id} value={estudiante.id}>
              {estudiante.nombre}
            </option>
          ))}
        </select>
      </div>
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
                <td>{nombresActividades[prog.actividad] || prog.actividad}</td>
                <td>{prog.nivel}</td>
                <td>{prog.puntaje} / 100</td>
                <td>{new Date(prog.fecha_ejecucion).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}

export default Reporte;
