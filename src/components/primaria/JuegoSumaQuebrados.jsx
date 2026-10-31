import { useState, useEffect } from "react";
import "../../App.css";

function JuegoSumaQuebrados({ onReturn }) {
  const [puntuacion, setPuntuacion] = useState(0);
  const [factores, setFactores] = useState({
    a: 0,
    b: 0,
    c: 0,
    respuesta: "0/0",
  });
  const [juegoGanado, setJuegoGanado] = useState(false);
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [opciones, setOpciones] = useState([]);

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

  useEffect(() => {
    generarPregunta();
  }, []);

  const generarPregunta = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const c = Math.floor(Math.random() * 9) + 2;

    const respuestaNumerador = a + b;
    const respuestaDenominador = c;

    const respuestaCorrecta =
      respuestaNumerador.toString() + "/" + respuestaDenominador.toString();

    const respuestaF1 =
      (respuestaNumerador + 2).toString() +
      "/" +
      respuestaDenominador.toString();
    const respuestaF2 =
      (respuestaNumerador + 1).toString() +
      "/" +
      respuestaDenominador.toString();
    const respuestaF3 =
      (respuestaNumerador + 3).toString() +
      "/" +
      respuestaDenominador.toString();

    const opcionesSinOrdenar = [
      respuestaCorrecta,
      respuestaF1,
      respuestaF2,
      respuestaF3,
    ];
    const opcionesMezcladas = randomizar(opcionesSinOrdenar);

    setFactores({ a, b, c, respuesta: respuestaCorrecta });
    setOpciones(opcionesMezcladas);
  };

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
              ¡Felicidades, completaste las sumas de quebrados! 🎉
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
      <h1 className="titulo">Este es el Juego de Suma de Quebrados</h1>
      <p className="texto-instruccion">Debes realizar la suma de quebrados y tratar de ganar la mayor cantidad de puntos!</p>
      <p className="contador">Pregunta no: {numeroPreguntas + 1} / 10</p>
      <div className="factores">
        <span className="division">
          <span>{factores.a}</span>
          <span> — </span>
          <span>{factores.c} </span>
        </span>
        +
        <span className="division">
          <span>{factores.b}</span>
          <span> —</span>
          <span>{factores.c}</span>
        </span>
        = ?
      </div>
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
      <p className="texto-puntuacion tablas">
        Tu puntuación es: <span className="puntos">{puntuacion}</span>
      </p>
      <div className="contenedor-botones">
        <button className="btn btn-volver" onClick={onReturn}>
          ← Volver al Menú
        </button>
      </div>
    </div>
  );
}

export default JuegoSumaQuebrados;
