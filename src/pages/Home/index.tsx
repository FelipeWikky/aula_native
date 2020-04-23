import React, {useContext} from 'react';
import { useIsFocused } from '@react-navigation/native';

import HomeView from './view';
import HomeInterface from './interface';

import HeaderContext from '../../contexts/HeaderContext';

import api from '../../services/api';

// import getConnection from '../../database/connection';
// const connection = getConnection('irpf');
// const database = connection.database;
// const sql = connection.sql;
import connect, { sql } from '@databases/expo';
const database = connect('irpf');

type Irpf = {
  pagou?: [any],
  name: string,
  gain: number,
  gastoEduc?: number,
  gastoSaude?: number,
  gastoDeduc?: number,
  // valorFaixaIsento?: number,
  // valorFaixa075?: number,
  // valorFaixa150?: number,
  // valorFaixa225?: number,
  // valorFaixa275?: number,
  // totalAPagar?: number,

  // [props: string]: any
}

export default class Home extends React.Component<any, Irpf> implements HomeInterface {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      gain: 0,
      gastoEduc: 0,
      gastoSaude: 0,
      gastoDeduc: 0,
    }
  }


  async componentDidMount() {  
    console.log('voltou pra ca') 
    try {
      //const response = await database.query(sql`create table if not exists irpf(id integer primary key, name varchar(30), ganhoAnual decimal, faixaIsento decimal default 0, faixa075 decimal default 0, faixa150 decimal default 0, faixa225 decimal default 0, faixa275 decimal default 0, totalAPagar decimal default 0)`);
      const dropTableIrpf = await database.query(sql`drop table if exists irpf;`);
      console.log(dropTableIrpf);

      const createTableIrpf = await database.query(sql`create table if not exists irpf(name varchar(30) primary key not null, ganhoAnual decimal, faixaIsento decimal default 0, faixa075 decimal default 0, faixa150 decimal default 0, faixa225 decimal default 0, faixa275 decimal default 0, totalAPagar decimal default 0)`);
      console.log(createTableIrpf);

    } catch(err) {
      console.log('Erro -> ' + err);
    }
  }

  handleNavigate(namePage: string | null) {
    if (namePage && namePage !== '') {
      this.props.navigation.navigate(namePage);
    } else {
      this.props.navigation.goBack();
    }
  }


  async handleCalculate(obj:Irpf):Promise<void> {
    try {
      //GET Method
      const response = await api.get(`/irpf/${this.state.gain}/${this.state.name}`);
      const data: Irpf = await response.data;
      // console.log(data);

      //POST Method
      // const body = { name, gain }
      // const response = await api.post('/irpf', this.state);
      // const data = await response.data;
      

      //Enviar para próxima tela com o dados
      this.props.navigation.navigate('Result', data);

    } catch (err) {
      console.log(err);
    }
  }

  handleChangeInput(inputName: string, value: string) {
    parseInt(value) > 0
      ?
      this.setState({ ...this.state, [inputName]: Number(value) })
      :
      this.setState({ ...this.state, [inputName]: value });

  }

  render(): React.ReactNode {
    return(
      // <HomeView master={this} />
      <HomeRender class={this}/>
    );
  }
}

interface Props {
  class: HomeInterface;
}

const HomeRender = (props:Props) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    const {setTitleHeader, showBackButton} = useContext(HeaderContext);
    setTitleHeader('Calcular IR');
    showBackButton(false);
  }


  return(
    <HomeView master={props.class} />
  );
}
