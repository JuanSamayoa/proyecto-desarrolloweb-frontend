import { useEffect, useState } from "react";
import "../App.css";
import JuegoEspacial from "../components/preprimaria/JuegoEspacial";
import JuegoFiguras from "../components/preprimaria/JuegoFiguras";
import JuegoMemoria from "../components/preprimaria/JuegoMemoria";
import SelectorEstudiante, {
  obtenerEstudiantes,
} from "../components/SelectorEstudiante";

function Preprimaria() {
  // Juegos activos
  const [juegoActivo, setJuegoActivo] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");

  useEffect(() => {
    obtenerEstudiantes().then(setEstudiantes);
  }, []);

  if (juegoActivo === "figuras") {
    return (
      <JuegoFiguras
        estudianteId={estudianteSeleccionado}
        onReturn={() => setJuegoActivo(null)}
      />
    );
  } else if (juegoActivo === "espacial") {
    return (
      <JuegoEspacial
        estudianteId={estudianteSeleccionado}
        onReturn={() => setJuegoActivo(null)}
      />
    );
  } else if (juegoActivo === "memoria") {
    return (
      <JuegoMemoria
        estudianteId={estudianteSeleccionado}
        onReturn={() => setJuegoActivo(null)}
      />
    );
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Bienvenido a la plataforma para Pre-Primaria</h1>
      <h2 className="subtitulo">Selecciona un Minijuego</h2>
      <SelectorEstudiante
        estudiantes={estudiantes}
        estudianteSeleccionado={estudianteSeleccionado}
        onChange={setEstudianteSeleccionado}
      />
      <div className="opciones-juegos">
        <button
          className="btn item-fig"
          disabled={!estudianteSeleccionado}
          onClick={() => setJuegoActivo("figuras")}
        >
          Reconocer Figuras Geométricas
        </button>
        <button
          className="btn item-esp"
          disabled={!estudianteSeleccionado}
          onClick={() => setJuegoActivo("espacial")}
        >
          Conocimientos Espaciales
        </button>
        <button
          className="btn item-mem"
          disabled={!estudianteSeleccionado}
          onClick={() => setJuegoActivo("memoria")}
        >
          Juego de Memoria
        </button>
      </div>
    </div>
  );
}

export default Preprimaria;
