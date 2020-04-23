import React from 'react';

import styles from './styles';
import { View, Text } from 'react-native';

import ResultInterface from './interface';

interface Props {
  master: ResultInterface,
}

interface State {
}

export default class ResultView extends React.Component<{ master: ResultInterface }, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { master } = this.props;

    return (
      <View style={styles.container}>

        <View style={styles.info}>

          <Text style={[styles.text, styles.textName]}>
            Olá, {master.state.name}
          </Text>
          <Text style={[styles.text, styles.textAnnualGain]}>
            Ganho Anual informado: R$ {master.state.gain.toFixed(2)}
          </Text>

        </View>

        <View>
          <View style={styles.card}>
            <Text style={styles.text}>
              Faixa Isento: R$ {master.state.valorFaixaIsento?.toFixed(2)}
            </Text>
          </View>

          {master.state.valorFaixa075
            ?
            <View style={styles.card}>
              <Text style={styles.text}>
                Faixa 7.5%: R${master.state.valorFaixa075?.toFixed(2)}
              </Text>
            </View>
            :
            null
          }

          {master.state.valorFaixa150
            ?
            <View style={styles.card}>
              <Text style={styles.text}>
                Faixa 15%: R$ {master.state.valorFaixa150?.toFixed(2)}
              </Text>
            </View>
            :
            null
          }

          {master.state.valorFaixa225
            ?
            <View style={styles.card}>
              <Text style={styles.text}>
                Faixa 22.5%: R${master.state.valorFaixa150?.toFixed(2)}
              </Text>
            </View>
            :
            null

          }
        
          {master.state.valorFaixa275
            ?
            <View style={styles.card}>
              <Text style={styles.text}>
                Faixa 27.5%: R${master.state.valorFaixa275?.toFixed(2)}
              </Text>
            </View>
            :
            null
          }

        </View>

        <View style={[styles.card, { marginBottom: 30 }]}>
          <Text style={styles.text}>
            {master.state.totalAPagar
              ?
              <Text style={styles.text}>
                Valor Total a Pagar: R${master.state.totalAPagar?.toFixed(2)}
              </Text>
              :
              <Text style={styles.text}>
                Este ano (in)felizmente, não precisará pagar.
              </Text>
            }
          </Text>
        </View>

      </View>
    );
  }
}