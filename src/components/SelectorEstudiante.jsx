import { Link } from "react-router-dom";
import "../App.css";

const CLAVE_ESTUDIANTES = "estudiantesRegistrados";
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "/api"
    : "https://dw-api-backend-2026-gmd6hmbzb6crf9cd.mexicocentral-01.azurewebsites.net/api");

const obtenerEstudiantesLocales = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_ESTUDIANTES)) || [];
  } catch (error) {
    console.error("Error al consultar estudiantes:", error);
    return [];
  }
};

export const obtenerEstudiantes = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/estudiantes`);
    if (!respuesta.ok) {
      throw new Error("No se pudieron consultar los estudiantes");
    }

    const estudiantes = await respuesta.json();
    localStorage.setItem(CLAVE_ESTUDIANTES, JSON.stringify(estudiantes));
    return estudiantes;
  } catch (error) {
    console.error("Error al consultar estudiantes:", error);
    return obtenerEstudiantesLocales();
  }
};

export const guardarEstudiante = (estudiante) => {
  const estudiantes = obtenerEstudiantesLocales();
  const estudiantesActualizados = [
    ...estudiantes.filter((item) => item.id !== estudiante.id),
    estudiante,
  ];

  localStorage.setItem(
    CLAVE_ESTUDIANTES,
    JSON.stringify(estudiantesActualizados),
  );
};

export const guardarProgreso = async (estudianteId, actividadId, puntaje) => {
  if (!estudianteId || !actividadId || puntaje < 0) {
    return;
  }

  const respuesta = await fetch(`${API_URL}/progresos`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      estudiante_id: Number.parseInt(estudianteId, 10),
      actividad_id: actividadId,
      puntaje,
    }),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo guardar el progreso");
  }
};

function SelectorEstudiante({ estudiantes, estudianteSeleccionado, onChange }) {
  return (
    <div className="selector-estudiante">
      <label htmlFor="estudiante">¿Quién va a jugar?</label>
      {estudiantes.length > 0 ? (
        <select
          id="estudiante"
          value={estudianteSeleccionado}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Selecciona un estudiante</option>
          {estudiantes.map((estudiante) => (
            <option key={estudiante.id} value={estudiante.id}>
              {estudiante.nombre} ({estudiante.edad} años)
            </option>
          ))}
        </select>
      ) : (
        <p>
          Primero registra un estudiante en <Link to="/">Inicio</Link>.
        </p>
      )}
    </div>
  );
}

export default SelectorEstudiante;
