import React from "react";

interface ICriptomonedaProps {
  key: string;
  criptomoneda: any;
}
const Criptomoneda: React.FC<ICriptomonedaProps> = ({ criptomoneda }) => {
  const { FullName, Name } = criptomoneda.CoinInfo;
  return <option value={Name}>{FullName}</option>;
};

export default Criptomoneda;
