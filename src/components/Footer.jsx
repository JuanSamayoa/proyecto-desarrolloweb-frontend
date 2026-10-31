import "../App.css"

function Footer(){

  return (
    <div className="footer">
      <div className="nombre-proy">
        <h1 className="titulo">Proyecto Final</h1>
        <p>Curso Desarrollo Web</p>
      </div>
      <div>
        <h1 className="titulo">Mis Redes Sociales</h1>
        <ul>
          <li>
            <a href="https://github.com/JuanSamayoa">Github - Juan Samayoa</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/juansamayoa/">
              LinkedIn - Juan Samayoa
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;