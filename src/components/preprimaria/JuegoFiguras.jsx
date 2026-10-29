import { useState } from "react";
import "../../App.css";

function JuegoFiguras({ onReturn }) {
  //figuras y estados iniciales de juego
  const figuras = ["Circulo", "Cuadrado", "Triangulo", "Rectangulo"];
  const [figuraObjetivo, setFiguraObjetivo] = useState("Triangulo");
  const [mensaje, setMensaje] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);

  const obtenerFiguraAleatoria = () => {
    //constantes para obtener un numero al azar
    const nuevoArreglo = figuras.filter((f) => f != figuraObjetivo);
    const indiceAleatorio = Math.floor(Math.random() * nuevoArreglo.length);
    const nuevaFigura = nuevoArreglo[indiceAleatorio];

    setFiguraObjetivo(nuevaFigura);
  };

  const evaluarRespuesta = (figuraSeleccionada) => {
    if (figuraSeleccionada === figuraObjetivo) {
      setMensaje("¡Excelente!");
      setPuntuacion(puntuacion + 10);
      obtenerFiguraAleatoria();
    } else {
      alert("Haz perdido, intentalo de nuevo. Tu puntuación es: " + puntuacion);
      setMensaje("¡Intentalo de nuevo!");
      setPuntuacion(0);
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Reconocer figuras</h1>
      <p className="texto-instruccion">Debes seleccionar la figura que se pide a continuación.</p>
      <h2 className="subtitulo">
        Haz clic en el: <span className="texto-objetivo">{figuraObjetivo}</span>
      </h2>
      <div className="figuras">
        {figuras.map((f) => (
          <button
            key={f}
            className={`btn-figura ${f.toLowerCase()}`}
            onClick={() => evaluarRespuesta(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <p>{mensaje}</p>
      <p>Tu puntuación es: {puntuacion}</p>
      <br />
      <button className="btn btn-volver" onClick={onReturn}>
        ← Volver al Menú
      </button>
    </div>
  );
}

export default JuegoFiguras;
