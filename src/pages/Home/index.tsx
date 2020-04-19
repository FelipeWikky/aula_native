import React, { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';

import styles from './styles';
import Header from '../../components/Header';

import api from '../../services/api';
import InputError from '../../utils/InputError';
import { copyBundledRealmFiles } from 'realm';
// import getRealm from '../../services/realm';

type Irpf = {
  pagou: [any],
  name: string,
  ganhoAnual: number,
  valorFaixaIsento?: number,
  valorFaixa075?: number,
  valorFaixa150?: number,
  valorFaixa225?: number,
  valorFaixa275?: number,
  totalAPagar?: number
}

export default function Result() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [gain, setGain] = useState(0);
  const [gastoEduc, setGastoEduc] = useState(0);
  const [gastoSaude, setGastoSaude] = useState(0);
  const [gastoDeduc, setGastoDeduc] = useState(0);

  const [inputError, setInputError] = useState([{}, {}, {}, {}, {}]);

  async function handleCalculate(): Promise<void> {
    try {
      const obj = {
        name,
        gain,
        gastoEduc,
        gastoSaude,
        gastoDeduc
      }

      const validate = Yup.object().shape({
        name : Yup.string().min(3).required(),
        gain: Yup.number().positive().required().min(1),
        gastoEduc: Yup.number().positive().required().min(1),
        gastoSaude: Yup.number().positive().required().min(1),
        gastoDeduc: Yup.number().positive().required().min(1),
      });

      await validate.validate(obj, {
        abortEarly: false,
      })

      const response = await api.get(`/irpf/${gain}/${name}`);
      const data: Irpf = await response.data;
      const body = { name, gain }
      //const response = await api.post('/irpf', body);
      // const data = await response.data;

      //await saveCalculation(data);

      //Limpando borda de erro
      setInputError([{}, {}, {}, {}, {}]);

      navigation.navigate('Result', data);

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        var errors:Array<Object> = [{}, {}, {}, {}, {}];

        err.errors.forEach(err => {
          console.log('Erro - ' + err );
          if ( InputError(err) > -1 ) {
            errors[InputError(err)] = { borderColor:'#F00'};
          }
          
        });

        setInputError(errors);
      } else {
        console.log(err);
      }
    }
  }

  // async function saveCalculation(data: Irpf): Promise<void> {
  //   try {
  //     const realm = await getRealm();

  //     realm.write(() => {
  //       realm.create('irpf', data);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <Header
        title='Cálculo de IR'
        isShowBackButton={false}
      />

      <View style={styles.container}>

        <View style={styles.formContainer}>

          <Text style={styles.describe}>
            Informe seu Nome
          </Text>
          <TextInput
            style={[styles.input, inputError[0]]}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.describe}>
            Ganho Anual (R$)
        </Text>

          <TextInput
            style={[styles.input, inputError[1]]}
            keyboardType='numeric'
            //value={String(gain)}
            onChangeText={text => setGain(Number(text))}
          />

          <Text style={styles.describe}>
            Gastos com Educação (R$)
        </Text>
          <TextInput
            style={[styles.input, inputError[2]]}
            keyboardType='numeric'
            onChangeText={text => setGastoEduc(Number(text))}
          />

          <Text style={styles.describe}>
            Gastos com Saúde (R$)
        </Text>
          <TextInput
            style={[styles.input, inputError[3]]}
            keyboardType='numeric'
            onChangeText={text => setGastoSaude(Number(text))}
          />

          <Text style={styles.describe}>
            Demais Deduções (R$)
        </Text>
          <TextInput
            style={[styles.input, inputError[4]]}
            keyboardType='numeric'
            onChangeText={text => setGastoDeduc(Number(text))}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleCalculate}
          >
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Ionicons name='ios-calculator' size={30} color='#FFF' />
              <Text style={styles.textButton}>Calcular</Text>
            </View>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={[styles.button, { marginTop: 30 }]}
          onPress={() => navigation.navigate('Historic')}
        >
          <Text style={styles.textButton}>Histórico de Cálculos</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}
