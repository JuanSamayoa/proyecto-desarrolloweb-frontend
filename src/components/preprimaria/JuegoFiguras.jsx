import { useState } from "react";
import "../../App.css";
import { guardarProgreso } from "../SelectorEstudiante";

function JuegoFiguras({ estudianteId, onReturn }) {
  //figuras y estados iniciales de juego
  const figuras = ["Circulo", "Cuadrado", "Triangulo", "Rectangulo"];
  const [figuraObjetivo, setFiguraObjetivo] = useState("Triangulo");
  const [mensaje, setMensaje] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [contador, setContador] = useState(1);
  const [juegoGanado, setJuegoGanado] = useState(false);

  const actualizarPuntuacion = (nuevaPuntuacion) => {
    setPuntuacion(nuevaPuntuacion);
    guardarProgreso(estudianteId, 2, nuevaPuntuacion).catch((error) => {
      console.error("Error al guardar el progreso:", error);
    });
  };

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
      actualizarPuntuacion(puntuacion + 10);
      const siguienteContador = contador + 1;

      if (siguienteContador === 11) {
        setContador(10);
        setJuegoGanado(true);
        return;
      }

      obtenerFiguraAleatoria();
      setContador(siguienteContador);
    } else {
      alert(
        "Haz perdido, intentalo de nuevo. Tu puntuación ha sido: " + puntuacion,
      );
      actualizarPuntuacion(puntuacion);
      setMensaje("¡Intentalo de nuevo!");
      setContador(1);
    }
  };

  const reiniciarJuego = () => {
    setFiguraObjetivo("Triangulo");
    setMensaje("");
    setPuntuacion(0);
    setContador(1);
    setJuegoGanado(false);
  };

  return (
    <div className="contenedor">
      {juegoGanado && (
        <div className="modal">
          <div className="cuadro-modal">
            <p className="texto-objetivo">
              ¡Felicidades, reconociste todas las figuras! 🎉
            </p>
            <button
              className="btn btn-modal btn-reiniciar"
              onClick={reiniciarJuego}
            >
              Intentar de nuevo
            </button>
            <button className="btn btn-modal btn-modal-menu" onClick={onReturn}>
              Salir al menú
            </button>
          </div>
        </div>
      )}
      <h1 className="titulo">Reconocer figuras</h1>
      <p className="texto-instruccion">
        Debes seleccionar la figura que se pide a continuación.
      </p>
      <p className="contador">Pregunta no: {contador} / 10</p>
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
