import { useState } from "react";
import "../../App.css";
import gato from "../../assets/svg/cat.svg";
import perro from "../../assets/svg/dog.svg";
import leon from "../../assets/svg/lion.svg";
import delfin from "../../assets/svg/dolphin.svg";
import { useRef } from "react";

function JuegoMemoria({ onReturn }) {
  const cartas = [
    {
      id: 1,
      contenido: "gato",
      volteada: false,
      encontrado: false,
      svg: gato,
    },
    {
      id: 2,
      contenido: "perro",
      volteada: false,
      encontrado: false,
      svg: perro,
    },
    {
      id: 3,
      contenido: "león",
      volteada: false,
      encontrado: false,
      svg: leon,
    },
    {
      id: 4,
      contenido: "delfín",
      volteada: false,
      encontrado: false,
      svg: delfin,
    },
    {
      id: 5,
      contenido: "gato",
      volteada: false,
      encontrado: false,
      svg: gato,
    },
    {
      id: 6,
      contenido: "león",
      volteada: false,
      encontrado: false,
      svg: leon,
    },
    {
      id: 7,
      contenido: "delfín",
      volteada: false,
      encontrado: false,
      svg: delfin,
    },
    {
      id: 8,
      contenido: "perro",
      volteada: false,
      encontrado: false,
      svg: perro,
    },
  ];
  const [baraja, setBaraja] = useState(cartas);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const timerReinicio = useRef(null);

  //Click en carta para comprobar pares
  const manejarClicCarta = (b) => {
    if (deshabilitado || b.encontrado || b.volteada) {
      return;
    }

    const nuevaBaraja = baraja.map((c) =>
      c.id === b.id ? { ...c, volteada: true } : c,
    );

    setBaraja(nuevaBaraja);

    if (seleccionadas.length === 0) {
      setSeleccionadas([b]);
    } else if (seleccionadas.length === 1) {
      setDeshabilitado(true);
      if (seleccionadas[0].contenido === b.contenido) {
        let barajaActualizada = nuevaBaraja.map((carta) => {
          if (carta.id === b.id || carta.id === seleccionadas[0].id) {
            return { ...carta, encontrado: true };
          } else {
            return carta;
          }
        });
        setBaraja(barajaActualizada);
        setPuntuacion(puntuacion + 20);
        setDeshabilitado(false);
        setSeleccionadas([]);
      } else {
        timerReinicio.current = setTimeout(() => {
          let barajaActualizada = nuevaBaraja.map((carta) => {
            if (carta.id === b.id || carta.id === seleccionadas[0].id) {
              return { ...carta, volteada: false };
            } else {
              return carta;
            }
          });
          console.log("Mal intento");
          setBaraja(barajaActualizada);
          setSeleccionadas([]);
          setDeshabilitado(false);
          setPuntuacion((prev) => Math.max(0, prev - 5));
        }, 1000);
      }
    }
  };

  const reiniciarTablero = () => {
    console.log("Reiniciando baraja...");
    clearTimeout(timerReinicio.current);
    const nuevaBaraja = baraja.map((c) => ({
      ...c,
      volteada: false,
      encontrado: false,
    }));
    //const juegoGanado = baraja.every((c) => c.encontrado === true);
    setBaraja(nuevaBaraja);
    setSeleccionadas([]);
    setPuntuacion(0);
    setDeshabilitado(false);
  };

  const juegoGanado = baraja.every((c) => c.encontrado === true);

  return (
    <div className="contenedor">
      {juegoGanado && (
        <div className="modal">
          <div className="cuadro-modal">
            <p className="texto-objetivo">
              ¡Felicidades, encontraste todos los pares! 🎉
            </p>
            <button
              className="btn btn-modal btn-reiniciar"
              onClick={() => reiniciarTablero()}
            >
              Intentar de nuevo
            </button>
            <button className="btn btn-modal btn-modal-menu" onClick={onReturn}>
              Salir al menú
            </button>
          </div>
        </div>
      )}
      <h1 className="titulo">Juego de Memoria</h1>
      <p className="texto-instruccion">
        Debes encontrar 2 pares de la misma figura para ganar el juego!
      </p>
      <div className="tablero-memoria">
        {baraja.map((b) => (
          <button
            className={`carta ${b.volteada || b.encontrado ? "revelada" : ""} ${b.encontrado ? "encontrada" : ""}`}
            key={b.id}
            onClick={() => manejarClicCarta(b)}
            disabled={deshabilitado || b.encontrado}
          >
            {b.volteada || b.encontrado ? (
              <div className="contenedor-animal">
                <img className="icono-animal" src={b.svg} alt={b.contenido} />
                <p className="texto-animal">{b.contenido}</p>
              </div>
            ) : (
              "?"
            )}
          </button>
        ))}
      </div>
      <p>Tu puntuación es: {puntuacion}</p>
      <div className="botones-memoria">
        <button
          className="btn btn-reiniciar"
          onClick={() => reiniciarTablero()}
        >
          Reiniciar
        </button>
        <button className="btn btn-volver" onClick={onReturn}>
          ← Volver al Menú
        </button>
      </div>
    </div>
  );
}

export default JuegoMemoria;
