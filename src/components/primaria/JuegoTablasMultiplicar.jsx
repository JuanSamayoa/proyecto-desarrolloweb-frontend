import { useEffect, useState } from "react";
import "../../App.css";

function JuegoTablasMultiplicar({ onReturn }) {
  const [factores, setFactores] = useState({ a: 0, b: 0, respuesta: 0 });
  const [opciones, setOpciones] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [juegoGanado, setJuegoGanado] = useState(false);

  const randomizar = (arr) => {
    const arregloOrdenado = structuredClone(arr);
    for (let i = arregloOrdenado.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arregloOrdenado[i], arregloOrdenado[j]] = [
        arregloOrdenado[j],
        arregloOrdenado[i],
      ];
    }
    return arregloOrdenado;
  };

  const generarPregunta = () => {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;

    const respuestaCorrecta = a * b;

    const respuestaF1 = respuestaCorrecta + 2;
    const respuestaF2 = respuestaCorrecta - 3;
    const respuestaF3 = respuestaCorrecta + 4;

    const opcionesSinOrdenar = [
      respuestaCorrecta,
      respuestaF1,
      respuestaF2,
      respuestaF3,
    ];
    const opcionesMezcladas = randomizar(opcionesSinOrdenar);

    setFactores({ a, b, respuesta: respuestaCorrecta });
    setOpciones(opcionesMezcladas);
  };

  // Cargar la primera pregunta al montar el componente
  useEffect(() => {
    generarPregunta();
  }, []);

  const validarRespuesta = (seleccion) => {
    if (seleccion === factores.respuesta) {
      setPuntuacion((prev) => prev + 10);
      const siguientePregunta = numeroPreguntas + 1;

      if (siguientePregunta === 10) {
        setNumeroPreguntas(siguientePregunta);
        setJuegoGanado(true);
        return;
      }

      generarPregunta();
      setNumeroPreguntas(siguientePregunta);
    } else {
      alert("Respuesta incorrecta, ¡inténtalo de nuevo!");
      setPuntuacion((prev) => Math.max(0, prev - 5));
    }
  };

  const reiniciarJuego = () => {
    setPuntuacion(0);
    setNumeroPreguntas(0);
    setJuegoGanado(false);
    generarPregunta();
  };

  return (
    <div className="contenedor">
      {juegoGanado && (
        <div className="modal">
          <div className="cuadro-modal">
            <p className="texto-objetivo">
              ¡Felicidades, completaste las tablas de multiplicar! 🎉
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
      <h1 className="titulo">Juego de Tablas de Multiplicar</h1>
      <p className="texto-instruccion">
        Selecciona la respuesta correcta para la siguiente operación:
      </p>
      <p className="contador">Pregunta no: {numeroPreguntas + 1} / 10</p>

      {/* Operación matemática */}
      <div className="factores">
        {factores.a} × {factores.b} = ?
      </div>

      {/* Botones de opciones */}
      <div className="multiplicaciones">
        {opciones.map((opc, index) => (
          <button
            key={index}
            className="btn btn-guardar btn-opcion-multiplicacion"
            onClick={() => validarRespuesta(opc)}
          >
            {opc}
          </button>
        ))}
      </div>

      {/* Puntuación y Navegación */}
      <p className="texto-puntuacion tablas">
        Tu puntuación es: <span className="puntos">{puntuacion}</span>
      </p>

      <div className="botones-memoria">
        <button className="btn btn-volver" onClick={onReturn}>
          ← Volver al Menú
        </button>
      </div>
    </div>
  );
}

export default JuegoTablasMultiplicar;
