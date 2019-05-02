import React from "react";

interface IResultadoProps {
  resultado: any;
}
const Resultado: React.FC<IResultadoProps> = ({ resultado }) => {
  if (Object.entries(resultado).length === 0) return null;
  return (
    <div className="resultado">
      <h2>Resultado</h2>
      <p className="precio">
        El precio es <span>{resultado.PRICE}</span>
      </p>
      {resultado.LOWDAY}
      <p>
        Precio mas alto del día: <span>{resultado.HIGHDAY}</span>
      </p>
      <p>
        Precio mas bajo del día: <span>{resultado.LOWDAY}</span>
      </p>
    </div>
  );
};
export default Resultado;
