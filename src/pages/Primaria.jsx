import { useEffect, useState } from "react";
import "../App.css";
import JuegoMultiplicarDecimales from "../components/primaria/JuegoMultiplicarDecimales";
import JuegoSumaQuebrados from "../components/primaria/JuegoSumaQuebrados";
import JuegoTablasMultiplicar from "../components/primaria/JuegoTablasMultiplicar";
import SelectorEstudiante, {
  obtenerEstudiantes,
} from "../components/SelectorEstudiante";

function Primaria() {
  // Juegos activos
  const [juegoActivo, setJuegoActivo] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");
  const [cargandoEstudiantes, setCargandoEstudiantes] = useState(true);

  useEffect(() => {
    const cargarEstudiantes = async () => {
      setEstudiantes(await obtenerEstudiantes());
      setCargandoEstudiantes(false);
    };

    cargarEstudiantes();
  }, []);

  if (juegoActivo === "tablas") {
    return (
      <JuegoTablasMultiplicar
        estudianteId={estudianteSeleccionado}
        onReturn={() => setJuegoActivo(null)}
      />
    );
  } else if (juegoActivo === "sumas") {
    return (
      <JuegoSumaQuebrados
        estudianteId={estudianteSeleccionado}
        onReturn={() => setJuegoActivo(null)}
      />
    );
  } else if (juegoActivo === "multiplicacion") {
    return (
      <JuegoMultiplicarDecimales
        estudianteId={estudianteSeleccionado}
        onReturn={() => setJuegoActivo(null)}
      />
    );
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Bienvenido a la plataforma para Primaria</h1>
      <h2 className="subtitulo">Selecciona un Minijuego</h2>
      <SelectorEstudiante
        estudiantes={estudiantes}
        estudianteSeleccionado={estudianteSeleccionado}
        onChange={setEstudianteSeleccionado}
        cargando={cargandoEstudiantes}
      />
      <div className="opciones-juegos">
        <button
          className="btn item-tabla"
          disabled={!estudianteSeleccionado}
          onClick={() => setJuegoActivo("tablas")}
        >
          Tablas de Multiplicar
        </button>
        <button
          className="btn item-sum"
          disabled={!estudianteSeleccionado}
          onClick={() => setJuegoActivo("sumas")}
        >
          Suma de Quebrados
        </button>
        <button
          className="btn item-multi"
          disabled={!estudianteSeleccionado}
          onClick={() => setJuegoActivo("multiplicacion")}
        >
          Multiplicación con Decimales
        </button>
      </div>
    </div>
  );
}

export default Primaria;
