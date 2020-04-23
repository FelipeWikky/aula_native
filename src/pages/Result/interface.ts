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

export default interface ResultInterface {
  state: Irpf;
}