
type Irpf = {
  pagou?: [any],
  name: string,
  gain: number,
  gastoEduc?: number,
  gastoSaude?: number,
  gastoDeduc?: number,
}

export default interface HomeInterface {
  state: object;

  handleChangeInput(inputName: string, value: string): void;

  handleCalculate(obj?:Irpf):Promise<void>;

  handleNavigate(namePage: string, data?:[]): void;
}