import { useEffect, useState } from "react";
import "../../App.css";
import { guardarProgreso } from "../SelectorEstudiante";

function JuegoMultiplicacionDecimales({ estudianteId, onReturn }) {
  const [puntuacion, setPuntuacion] = useState(0);
  const [factores, setFactores] = useState({ a: 0, b: 0, respuesta: 0 });
  const [juegoGanado, setJuegoGanado] = useState(false);
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [opciones, setOpciones] = useState([]);

  const actualizarPuntuacion = (nuevaPuntuacion) => {
    setPuntuacion(nuevaPuntuacion);
    guardarProgreso(estudianteId, 6, nuevaPuntuacion).catch((error) => {
      console.error("Error al guardar el progreso:", error);
    });
  };

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
    const a = (Math.floor(Math.random() * 90) + 10) / 10;
    const b = (Math.floor(Math.random() * 90) + 10) / 10;

    const respuestaCorrecta = parseFloat((a * b).toFixed(2));

    const respuestaF1 = parseFloat((respuestaCorrecta + 0.5).toFixed(2));
    const respuestaF2 = parseFloat((respuestaCorrecta + 1.2).toFixed(2));
    const respuestaF3 = parseFloat((respuestaCorrecta + 2.4).toFixed(2));

    const opcionesSinOrdenar = [
      respuestaCorrecta,
      respuestaF1,
      respuestaF2,
      respuestaF3,
    ];

    setFactores({ a, b, respuesta: respuestaCorrecta });
    setOpciones(randomizar(opcionesSinOrdenar));
  };

  const validarRespuesta = (seleccion) => {
    if (seleccion === factores.respuesta) {
      actualizarPuntuacion(puntuacion + 10);
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
      actualizarPuntuacion(Math.max(0, puntuacion - 5));
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
              ¡Felicidades, completaste las multiplicaciones con decimales! 🎉
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

      <h1 className="titulo">Multiplicación con Decimales</h1>
      <p className="texto-instruccion">
        Calcula el resultado correcto de la multiplicación.
      </p>
      <p className="contador">Pregunta no: {numeroPreguntas + 1} / 10</p>

      <div className="factores">
        {factores.a} × {factores.b} = ?
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

export default JuegoMultiplicacionDecimales;
