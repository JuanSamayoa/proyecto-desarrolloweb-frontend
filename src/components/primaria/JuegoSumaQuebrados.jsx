import "../../App.css";

function JuegoSumaQuebrados({ onReturn }) {
  return (
    <div className="contenedor">
      <h1 className="titulo">Este es el Juego de Suma de Quebrados</h1>
      <p className="texto-instruccion">Suma de quebados instruccion</p>
      <button className="btn btn-volver" onClick={onReturn}>
        ← Volver al Menú
      </button>
    </div>
  );
}

export default JuegoSumaQuebrados;
