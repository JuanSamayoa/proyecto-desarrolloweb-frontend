import { useState } from "react";
import JuegoFiguras from "../components/preprimaria/JuegoFiguras";
import "../App.css";
import JuegoEspacial from "../components/preprimaria/JuegoEspacial";
import JuegoMemoria from "../components/preprimaria/JuegoMemoria";

function Preprimaria() {

  // Juegos activos
  const [juegoActivo, setJuegoActivo] = useState(null);

  if(juegoActivo === 'figuras'){
    return <JuegoFiguras onReturn={() => setJuegoActivo(null)} />;
  } else if(juegoActivo === 'espacial') {
    return <JuegoEspacial onReturn={() => setJuegoActivo(null)} />;
  } else if(juegoActivo === 'memoria'){
    return <JuegoMemoria onReturn={() => setJuegoActivo(null)}/>
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Bienvenido a la plataforma para Pre-Primaria</h1>
      <h2 className="subtitulo">Selecciona un Minijuego</h2>
      <div className="opciones-juegos">
        <button
          className="btn item-fig"
          onClick={() => setJuegoActivo("figuras")}
        >
          Reconocer Figuras Geométricas
        </button>
        <button
          className="btn item-esp"
          onClick={() => setJuegoActivo("espacial")}
        >
          Conocimientos Espaciales
        </button>
        <button
          className="btn item-mem"
          onClick={() => setJuegoActivo("memoria")}
        >
          Juego de Memoria
        </button>
      </div>
    </div>
  );
}

export default Preprimaria;
