import { useState } from "react";
import "../App.css";
import JuegoMultiplicarDecimales from "../components/primaria/JuegoMultiplicarDecimales";
import JuegoSumaQuebrados from "../components/primaria/JuegoSumaQuebrados";
import JuegoTablasMultiplicar from "../components/primaria/JuegoTablasMultiplicar";

function Primaria() {
  // Juegos activos
  const [juegoActivo, setJuegoActivo] = useState(null);

  if(juegoActivo === 'tablas'){
    return <JuegoTablasMultiplicar onReturn={() => setJuegoActivo(null)} />;
  } else if(juegoActivo === 'sumas') {
    return <JuegoSumaQuebrados onReturn={() => setJuegoActivo(null)} />;
  } else if(juegoActivo === 'multiplicacion'){
    return <JuegoMultiplicarDecimales onReturn={() => setJuegoActivo(null)}/>
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Bienvenido a la plataforma para Primaria</h1>
      <h2 className="subtitulo">Selecciona un Minijuego</h2>
      <div className="opciones-juegos">
        <button
          className="btn item-tabla"
          onClick={() => setJuegoActivo("tablas")}
        >
          Tablas de Multiplicar
        </button>
        <button
          className="btn item-sum"
          onClick={() => setJuegoActivo("sumas")}
        >
          Suma de Quebrados
        </button>
        <button
          className="btn item-multi"
          onClick={() => setJuegoActivo("multiplicacion")}
        >
          Mutiplicación con Decimales
        </button>
      </div>
    </div>
  );
};

export default Primaria;
