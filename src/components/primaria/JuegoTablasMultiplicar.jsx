import "../../App.css";

function JuegoTablasMultiplicar({ onReturn }) {
  return (
    <div className="contenedor">
      <h1 className="titulo">Este es el Juego de Tablas de Multiplicar</h1>
      <p className="texto-instruccion">Nueva instruccion de multiplicar</p>
      <button className="btn btn-volver" onClick={onReturn}>
        ← Volver al Menú
      </button>
    </div>
  );
}

export default JuegoTablasMultiplicar;
