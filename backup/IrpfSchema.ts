export default class IrpfSchema{
  static schema = {
    name: 'irpf',
    primaryKey: 'id',
    properties:{
      id: {
        type:'int',
        indexed: true
      },
      name: 'string',
      annualGain: 'int',
      faixaIsento: 'float',
      faixa075: {
        type: 'float',
        default: 0
      },
      faixa150: {
        type: 'float',
        default: 0
      },
      faixa225: {
        type: 'float',
        default: 0
      },
      faixa275: {
        type: 'float',
        default: 0
      },
      totalAPagar: {
        type:'float',
        default: 0
      }
    }
  }
}