import React, { ReactNode, Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';

import styles from './styles';
import HomeInterface from './interface';

import Header from '../../components/Header';

import { InputError as fnInputError, messageInputError as fnMessageError } from '../../utils/InputError';

interface Props {
  master: HomeInterface;
}

interface State {
  inputError: object[],
  messageError: object[],
}

export default class HomeView extends Component<{ master: HomeInterface }, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputError: [],
      messageError: [],
    }
  }

  render(): ReactNode {
    const { master } = this.props;

    const validateData = async () => {
      try {
        //criando Validation Schema
        const validate = Yup.object().shape({
          name: Yup.string().min(3).required(),
          gain: Yup.number().positive().required().min(1),
          // gastoEduc: Yup.number().positive().required().min(1),
          // gastoSaude: Yup.number().positive().required().min(1),
          // gastoDeduc: Yup.number().positive().required().min(1),
        });

        //Verificando validação
        await validate.validate(master.state, {
          abortEarly: false,
        });

        /* Se tudo Ok */

        //Limpa as bordas dos inputs
        this.setState({ ...this.state, inputError: [], messageError: [] });

        //Chama função para calcular
        master.handleCalculate();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          var errors: Array<Object> = [{}, {}, {}, {}, {}];
          //var nameErrors: Array<Object> = [{}, {}, {}, {}, {}];
          var nameErrors:Array<any> = [];

          err.errors.forEach(err => {
            console.log('Validation error -> ' + err);
            if (fnInputError(err) > -1) {
              let whatError = fnInputError(err)
              errors[whatError] = { borderColor: '#F00' };
              nameErrors[whatError] = fnMessageError(err) || null;
            }

          });
          this.setState({ ...this.state, inputError: errors, messageError: nameErrors });
        } else {
          console.log(err);
        }
      }

    };

    return (
      <>
        <Header
          title='Calcular IR'
          isShowBackButton={false}
        />

        <View style={styles.container}>

          <View style={styles.formContainer}>

            <View>
              <Text style={styles.describe}>
                Informe seu Nome
              </Text>

              <Text style={styles.inputError}>
                {this.state.messageError[0]}
              </Text>

              <TextInput
                style={[styles.input, this.state.inputError[0]]}
                onChangeText={text => master.handleChangeInput('name', text)}
              />
            </View>

            <View>
              <Text style={styles.describe}>
                Ganho Anual (R$)
              </Text>

              <Text style={styles.inputError}>
                {this.state.messageError[1]}
              </Text>

              <TextInput
                style={[styles.input, this.state.inputError[1]]}
                keyboardType='numeric'
                onChangeText={text => master.handleChangeInput('gain', text)}
              />
            </View>

            <View>
              <Text style={styles.describe}>
                Gastos com Educação (R$)
              </Text>

              <TextInput
                style={[styles.input, this.state.inputError[2]]}
                keyboardType='numeric'
                onChangeText={text => master.handleChangeInput('gastoEduc', text)}
              />
            </View>

            <View>
              <Text style={styles.describe}>
                Gastos com Saúde (R$)
              </Text>

              <TextInput
                style={[styles.input, this.state.inputError[3]]}
                keyboardType='numeric'
                onChangeText={text => master.handleChangeInput('gastoSaude', text)}
              />
            </View>

            <Text style={styles.describe}>
              Demais Deduções (R$)
            </Text>

            <Text style={styles.inputError}>
              {/* {this.state.messageError[4] } */}
            </Text>

            <TextInput
              style={[styles.input, this.state.inputError[4]]}
              keyboardType='numeric'
              onChangeText={text => master.handleChangeInput('gastoDeduc', text)}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => validateData()}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name='ios-calculator' size={30} color='#FFF' />
                <Text style={styles.textButton}>Calcular</Text>
              </View>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={() => master.handleNavigate('Historic')}
          >
            <Text style={styles.textButton}>Histórico de Cálculos</Text>
          </TouchableOpacity>

        </View>
      </>
    );
  }
}

