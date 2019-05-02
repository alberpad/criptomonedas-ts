import React from "react";

interface IErrorProps {
  mensaje: string;
}
const Error: React.FC<IErrorProps> = ({ mensaje }) => {
  return (
    <div>
      <p className="error">{mensaje}</p>
    </div>
  );
};

export default Error;
