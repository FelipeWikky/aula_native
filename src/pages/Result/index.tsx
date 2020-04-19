import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

import Header from '../../components/Header';

type State = {
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

export default class Result extends React.Component<any, State>{
  constructor(props: any) {
    super(props);

    const { pagou, nome, ganhoAnual,
      valorFaixaIsento, valorFaixa075, valorFaixa150, valorFaixa225, valorFaixa275,
      totalAPagar } = props.route.params;

    this.state = {
      pagou, name: nome, ganhoAnual,
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
      <>
        <Header
          title='Cálculo Realizado'
          isShowBackButton={true}
        //navigation={this.props.navigation}
        />
        <View style={styles.container}>

          <View style={styles.info}>

            <Text style={[styles.text, styles.textName]}>
              Olá, {this.state.name}
            </Text>
            <Text style={[styles.text, styles.textAnnualGain]}>
              Ganho Anual informado: {this.state.ganhoAnual.toFixed(2)}
            </Text>

          </View>

          <View>
            <View style={styles.card}>
              <Text style={styles.text}>
                Faixa Isento: R$ {this.state.valorFaixaIsento?.toFixed(2)}
              </Text>
            </View>

            {this.state.valorFaixa075
              ?
              <View style={styles.card}>
                <Text style={styles.text}>
                  Faixa 0.75: R${this.state.valorFaixa075?.toFixed(2)}
                </Text>
              </View>
              :
              null
            }

            {this.state.valorFaixa150
              ?
              <View style={styles.card}>
                <Text style={styles.text}>
                  Faixa 1.50: R$ {this.state.valorFaixa150?.toFixed(2)}
                </Text>
              </View>
              :
              null
            }

            {this.state.valorFaixa225
              ?
              <View style={styles.card}>
                <Text style={styles.text}>
                  Faixa 2.25: R${this.state.valorFaixa225?.toFixed(2)}
                </Text>
              </View>
              :
              null

            }

            {this.state.valorFaixa275
              ?
              <View style={styles.card}>
                <Text style={styles.text}>
                  Faixa 2.75: R${this.state.valorFaixa275?.toFixed(2)}
                </Text>
              </View>
              :
              null
            }

          </View>

          <View style={[styles.card, {marginBottom:30}]}>
            <Text style={styles.text}>
              {this.state.totalAPagar
                ?
                <Text style={styles.text}>
                  Valor Total a Pagar: R${this.state.totalAPagar?.toFixed(2)}
                </Text>
                :
                <Text style={styles.text}>
                  Este ano (in)felizmente, não precisará pagar.
                </Text>
              }
            </Text>
          </View>

        </View>
      </>
    );
  }
}
