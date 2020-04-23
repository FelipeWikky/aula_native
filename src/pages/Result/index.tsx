import React from 'react';

import ResultView from './view';
import ResultInterface from './interface';

import HeaderContext from '../../contexts/HeaderContext';

type Irpf = {
  pagou?: [any],
  name: string,
  gain: number,
  gastoEduc?: number,
  gastoSaude?: number,
  gastoDeduc?: number,
  valorFaixaIsento?: number,
  valorFaixa075?: number,
  valorFaixa150?: number,
  valorFaixa225?: number,
  valorFaixa275?: number,
  totalAPagar?: number,

  // [props: string]: any
}

export default class Result extends React.Component<any, Irpf> implements ResultInterface {
  constructor(props: any) {
    super(props);

    const { pagou, nome, ganhoAnual,
      valorFaixaIsento, valorFaixa075, valorFaixa150, valorFaixa225, valorFaixa275,
      totalAPagar } = props.route.params;

    const data: Irpf = props.route.params;

    this.state = {
      pagou, name: nome, gain: ganhoAnual,
      valorFaixaIsento,
      valorFaixa075,
      valorFaixa150,
      valorFaixa225,
      valorFaixa275,
      totalAPagar
    }
  }

  render(): React.ReactNode {
    return (
      // <ResultView master={this} />
      <ResultRender class={this}/>
    );
  }
}

interface Props {
  class: ResultInterface;
}

const ResultRender = (props:Props) => {
  const {setTitleHeader, showBackButton} = React.useContext(HeaderContext);
  setTitleHeader('Cálculo de ' + props.class.state.name);
  showBackButton(true);

  return(
    <ResultView master={props.class}/>
  );
}


