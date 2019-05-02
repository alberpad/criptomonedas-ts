import React from "react";
import axios from "axios";
import Criptomoneda from "./Criptomoneda";
import Error from "./Error";

interface IState {
  criptomonedas: any[];
  moneda: string;
  criptomoneda: string;
  errorForm: boolean;
}
export interface ICotizacion {
  moneda: string;
  criptomoneda: string;
}
interface IFormProps {
  cotizarCriptomoneda: (cotizacion: ICotizacion) => void;
}
class Form extends React.Component<IFormProps> {
  state: IState = {
    criptomonedas: [],
    moneda: "",
    criptomoneda: "",
    errorForm: false
  };

  async componentWillMount() {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
    const response = await axios.get(url);
    this.setState({
      criptomonedas: response.data.Data
    });
  }

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  cotizarMoneda = (e: React.FormEvent) => {
    e.preventDefault();
    const { moneda, criptomoneda } = this.state;
    if (!moneda || !criptomoneda) {
      this.setState(
        {
          errorForm: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              errorForm: false
            });
          }, 2000);
        }
      );
      return;
    }
    const cotizacion: ICotizacion = {
      moneda,
      criptomoneda
    };
    this.props.cotizarCriptomoneda(cotizacion);
  };

  render() {
    const mensajeErrorForm = this.state.errorForm ? (
      <Error mensaje="Ambos campos son obligatorios" />
    ) : (
      ""
    );
    return (
      <form onSubmit={this.cotizarMoneda}>
        <div className="row">
          <div>
            <label>Elige tu Moneda</label>
            <select
              name="moneda"
              onChange={this.handleChange}
              className="u-full-width"
            >
              <option value="">Elige tu moneda</option>
              <option value="USD">Dolar Estadounidense</option>
              <option value="MXN">Peso Mexicano</option>
              <option value="GBP">Libras</option>
              <option value="EUR">Euros</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div>
            <label>Elige tu Criptomoneda</label>
            <select
              name="criptomoneda"
              onChange={this.handleChange}
              className="u-full-width"
            >
              <option value="">Elige tu criptomoneda</option>
              {Object.keys(this.state.criptomonedas).map(key => (
                <Criptomoneda
                  key={key}
                  criptomoneda={this.state.criptomonedas[parseInt(key)]}
                />
              ))}
            </select>
          </div>
        </div>
        <input
          className="button-primary u-full-width"
          type="submit"
          value="Cotizar"
        />
        {mensajeErrorForm}
      </form>
    );
  }
}

export default Form;
