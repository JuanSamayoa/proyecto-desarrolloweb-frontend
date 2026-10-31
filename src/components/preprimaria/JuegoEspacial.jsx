import { useState } from "react";
import "../../App.css";

function JuegoEspacial({ onReturn }) {
  const preguntas = [
    {
      pregunta: "¿Está el objeto ARRIBA?",
      respuesta: "Si",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792895763/arriba-si_uw4xig.jpg",
    },
    {
      pregunta: "¿Está el objeto DEBAJO?",
      respuesta: "No",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792895895/debajo-no_xulayu.jpg",
    },
    {
      pregunta: "¿El objeto está ADENTRO?",
      respuesta: "Si",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792895987/dentro-si_zttgrs.jpg",
    },
    {
      pregunta: "¿El objeto está AFUERA?",
      respuesta: "Si",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897219/afuera-si_vize4c.jpg",
    },
    {
      pregunta: "¿El objeto está CERCA?",
      respuesta: "No",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897402/cerca-no_mtx4br.jpg",
    },
    {
      pregunta: "¿El objeto está LEJOS?",
      respuesta: "Si",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897581/e3973e84-8837-463e-a76c-659387d50a54.png",
    },
    {
      pregunta: "¿El objeto está ARRIBA?",
      respuesta: "No",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897694/6ac42269-eeed-49ad-ad15-5f0633530fff.png",
    },
    {
      pregunta: "¿El objeto está DEBAJO?",
      respuesta: "Si",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897840/586ec259-ad7b-445b-8951-23f20491f21e.png",
    },
    {
      pregunta: "¿El objeto está AL LADO?",
      respuesta: "Si",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897908/a4778127-3a4c-4111-86dc-4d87ccf4943b.png",
    },
    {
      pregunta: "¿El objeto está ADENTRO?",
      respuesta: "No",
      imagen:
        "https://res.cloudinary.com/df3b2ec0h/image/upload/v1792897990/071a248c-7f2f-4aa4-8d68-f8dcab4b0cc8.png",
    },
  ];
  const [puntuacion, setPuntuacion] = useState(0);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [numeroPreguntas, setNumeroPreguntas] = useState(0);
  const [juegoGanado, setJuegoGanado] = useState(false);

  const evaluarRespuesta = (respuesta) => {
    if (respuesta === preguntas[indicePregunta].respuesta) {
      setMensaje("¡Excelente!");
      setPuntuacion((prev) => prev + 10);
      const siguientePregunta = numeroPreguntas + 1;

      if (siguientePregunta === preguntas.length) {
        setNumeroPreguntas(siguientePregunta);
        setJuegoGanado(true);
        return;
      }

      setNumeroPreguntas(siguientePregunta);
      obtenerPregunta();
    } else {
      alert("Haz perdido, intentalo de nuevo. Tu puntuación es: " + puntuacion);
      setMensaje("¡Intentalo de nuevo!");
      setPuntuacion(0);
    }
  };

  const obtenerPregunta = () => {
    let nuevoIndice = Math.floor(Math.random() * preguntas.length);
    while (nuevoIndice === indicePregunta) {
      nuevoIndice = Math.floor(Math.random() * preguntas.length);
    }
    setIndicePregunta(nuevoIndice);
  };

  const reiniciarJuego = () => {
    setPuntuacion(0);
    setIndicePregunta(0);
    setNumeroPreguntas(0);
    setMensaje("");
    setJuegoGanado(false);
  };

  return (
    <div className="contenedor">
      {juegoGanado && (
        <div className="modal">
          <div className="cuadro-modal">
            <p className="texto-objetivo">
              ¡Felicidades, completaste el juego espacial! 🎉
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
      <h1 className="titulo">Juego Espacial</h1>
      <p className="texto-instruccion">
        Debes seleccionar "Si" si es verdadero o "No" si es falso.
      </p>
      <h2 className="subtitulo">{preguntas[indicePregunta].pregunta}</h2>
      <img
        className="img-espacial"
        src={preguntas[indicePregunta].imagen}
        alt="imagen"
      />
      <div className="btn-decisiones">
        <button className="btn-si" onClick={() => evaluarRespuesta("Si")}>
          Si
        </button>
        <button className="btn-no" onClick={() => evaluarRespuesta("No")}>
          No
        </button>
      </div>
      <p>{mensaje}</p>
      <p>Tu puntuación es: {puntuacion}</p>
      <button className="btn btn-volver" onClick={onReturn}>
        ← Volver al Menú
      </button>
    </div>
  );
}

export default JuegoEspacial;
