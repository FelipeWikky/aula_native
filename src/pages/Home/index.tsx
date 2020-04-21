import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';

import styles from './styles';
import Header from '../../components/Header';

import api from '../../services/api';
import InputError from '../../utils/InputError';

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
  inputError?: any,

  // [props: string]: any
}

export default class Result extends React.Component<any, Irpf> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      gain: 0,
      gastoEduc: 0,
      gastoSaude: 0,
      gastoDeduc: 0,
      inputError: [{}, {}, {}, {}, {}],
    }
  }

  async componentDidMount() {
    try {
      console.log('----------');
      //const response = await database.query(sql`create table if not exists irpf(id integer primary key, name varchar(30), ganhoAnual decimal, faixaIsento decimal default 0, faixa075 decimal default 0, faixa150 decimal default 0, faixa225 decimal default 0, faixa275 decimal default 0, totalAPagar decimal default 0)`);
      const dropTableIrpf = await database.query(sql`drop table if exists irpf;`);
      console.log(dropTableIrpf);

      const createTableIrpf = await database.query(sql`create table if not exists irpf(name varchar(30) primary key not null, ganhoAnual decimal, faixaIsento decimal default 0, faixa075 decimal default 0, faixa150 decimal default 0, faixa225 decimal default 0, faixa275 decimal default 0, totalAPagar decimal default 0)`);
      console.log(createTableIrpf);

      console.log('----------');
    } catch(err) {
      console.log('Erro -> ' + err);
    }
  }


  async handleCalculate() {
    try {
      //Setando object base
      const obj: Irpf = {
        name: this.state.name,
        gain: this.state.gain,
        gastoEduc: this.state.gastoEduc,
        gastoSaude: this.state.gastoSaude,
        gastoDeduc: this.state.gastoDeduc
      }

      //criando Validation Schema
      const validate = Yup.object().shape({
        name: Yup.string().min(3).required(),
        gain: Yup.number().positive().required().min(1),
        gastoEduc: Yup.number().positive().required().min(1),
        gastoSaude: Yup.number().positive().required().min(1),
        gastoDeduc: Yup.number().positive().required().min(1),
      });

      //Verificando validação
      await validate.validate(obj, {
        abortEarly: false,
      })

      //Caso validação OK, requisitar na api
      //GET Method
      const response = await api.get(`/irpf/${this.state.gain}/${this.state.name}`);
      const data: Irpf = await response.data;
      // console.log(data);

      //POST Method
      // const body = { name, gain }
      // const response = await api.post('/irpf', this.state);
      // const data = await response.data;

      //Limpando borda de erro
      this.setState({ ...this.state, inputError: [{}, {}, {}, {}, {}] });

      //Enviando para próxima tela com o dados
      this.props.navigation.navigate('Result', data);

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        var errors: Array<Object> = [{}, {}, {}, {}, {}];

        err.errors.forEach(err => {
          console.log('Erro - ' + err);
          if (InputError(err) > -1) {
            errors[InputError(err)] = { borderColor: '#F00' };
          }

        });
        this.setState({ ...this.state, inputError: errors });
      } else {
        console.log(err);
      }
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
    return (
      <>
        <Header
          title='Calcular IR'
          isShowBackButton={false}
        />

        <View style={styles.container}>

          <View style={styles.formContainer}>

            <Text style={styles.describe}>
              Informe seu Nome
            </Text>
            <TextInput
              style={[styles.input, this.state.inputError[0]]}
              onChangeText={text => this.handleChangeInput('name', text)}
            />

            <Text style={styles.describe}>
              Ganho Anual (R$)
          </Text>

            <TextInput
              style={[styles.input, this.state.inputError[1]]}
              keyboardType='numeric'
              onChangeText={text => this.handleChangeInput('gain', text)}
            />

            <Text style={styles.describe}>
              Gastos com Educação (R$)
          </Text>
            <TextInput
              style={[styles.input, this.state.inputError[2]]}
              keyboardType='numeric'
              onChangeText={text => this.setState({ ...this.state, gastoEduc: Number(text) })}
            />

            <Text style={styles.describe}>
              Gastos com Saúde (R$)
          </Text>
            <TextInput
              style={[styles.input, this.state.inputError[3]]}
              keyboardType='numeric'
              onChangeText={text => this.setState({ ...this.state, gastoSaude: Number(text) })}
            />

            <Text style={styles.describe}>
              Demais Deduções (R$)
          </Text>
            <TextInput
              style={[styles.input, this.state.inputError[4]]}
              keyboardType='numeric'
              onChangeText={text => this.setState({ ...this.state, gastoDeduc: Number(text) })}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleCalculate()}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name='ios-calculator' size={30} color='#FFF' />
                <Text style={styles.textButton}>Calcular</Text>
              </View>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={() => this.props.navigation.navigate('Historic')}
          >
            <Text style={styles.textButton}>Histórico de Cálculos</Text>
          </TouchableOpacity>

        </View>
      </>
    );
  }
}
