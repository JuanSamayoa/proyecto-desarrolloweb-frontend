import "../../App.css"

function JuegoMultiplicarDecimales({ onReturn }){
  return (
    <div className="contenedor">
      <h1 className="titulo">Este es el Juego de Multiplicar con Decimales</h1>
      <p className="texto-instruccion">
        Nueva instruccion de multiplicar
      </p>
      <button className="btn btn-volver" onClick={onReturn}>
        ← Volver al Menú
      </button>
    </div>
  );
};

export default JuegoMultiplicarDecimales;