import { useEffect, useState } from "react";
import "../App.css"

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://dw-api-backend-2026-gmd6hmbzb6crf9cd.mexicocentral-01.azurewebsites.net/api";

function Reporte(){
  const [progresos, fijarProgresos] = useState([]);

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
        buscarProgresos();
      }, []);

  return(
    <div>
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

export default Reporte;