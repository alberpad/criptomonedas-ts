import React, { useState } from "react";
import imagen from "./cryptomonedas.png";
import Form, { ICotizacion } from "./components/Form";
import axios from "axios";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

interface IAppState {
  resultado: {};
  moneda: string;
  criptomoneda: string;
  cargando: boolean;
}
class App extends React.Component {
  state: IAppState = {
    resultado: {},
    moneda: "",
    criptomoneda: "",
    cargando: false
  };

  cotizarCriptomoneda = async (cotizacion: ICotizacion) => {
    const { moneda, criptomoneda } = cotizacion;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const response = await axios.get(url);
    const resultado = response.data.DISPLAY[criptomoneda][moneda];
    this.setState(
      {
        resultado,
        moneda,
        criptomoneda,
        cargando: true
      },
      () => {
        setTimeout(() => {
          this.setState({ cargando: false });
        }, 2000);
      }
    );
    console.log(this.state.resultado);
  };
  render() {
    const resultado = this.state.cargando ? (
      <Spinner />
    ) : (
      <Resultado resultado={this.state.resultado} />
    );
    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="imagen" className="logotipo" />
          </div>
          <div className="one-half column">
            <h1>Cotiza Criptomonedas al Instante</h1>
            <Form cotizarCriptomoneda={this.cotizarCriptomoneda} />
            {resultado}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
