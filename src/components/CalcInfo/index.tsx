import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

type Irpf = {
  data: {
    pagou: [any],
    name: string,
    ganhoAnual: number,
    valorFaixaIsento?: number,
    valorFaixa075?: number,
    valorFaixa150?: number,
    valorFaixa225?: number,
    valorFaixa275?: number,
    totalAPagar?: number
  },
  expansive?: boolean,
}

export default class CalcInfo extends React.Component<Irpf, Irpf> {
  constructor(props: Irpf) {
    super(props);
    this.state = {
      data: props.data,
      expansive: false,
    }
  }
  render(): React.ReactNode {
    return (
      <View style={styles.container}>

        <TouchableWithoutFeedback
          onPress={() => this.setState({ expansive: !this.state.expansive })}
        >
          <View style={styles.menu}>

            <View style={styles.infosContainer}>
              <Text style={styles.textName}>
                Nome: {this.state.data.name}
              </Text>
              <Text style={styles.textAnnualGain}>
                Ganho Anual: R$ {this.state.data.ganhoAnual}
              </Text>
            </View>

            <View style={styles.icon}>
              {this.state.expansive
                ?
                <Ionicons name='md-arrow-dropup-circle' size={35} color='#CCC' />
                :
                <Ionicons name='md-arrow-dropdown-circle' size={35} color='#CCC' />
              }
            </View>

          </View>
        </TouchableWithoutFeedback>

        {this.state.expansive
        ?
          <View style={styles.accordionContainer}>
            {this.state.data.valorFaixaIsento
            ?
              <Text style={styles.accordionText}>Faixa Isento: R$ {this.state.data.valorFaixaIsento.toFixed(2)}</Text>
            :
              <Text style={styles.accordionText}>Faixa Isento: ISENTO</Text>
            }

            {this.state.data.valorFaixa075
            ?
              <Text style={styles.accordionText}>Faixa 0.75: R$ {this.state.data.valorFaixa075.toFixed(2)}</Text>
            :
              <Text style={styles.accordionText}>Faixa 0.75: ISENTO</Text>
            }
            
            {this.state.data.valorFaixa150
            ?
              <Text style={styles.accordionText}>Faixa 1.50: R$ {this.state.data.valorFaixa150.toFixed(2)}</Text>
            :
              <Text style={styles.accordionText}>Faixa 1.50: ISENTO</Text>
            }

            {this.state.data.valorFaixa225
            ?
              <Text style={styles.accordionText}>Faixa 2.25: R$ {this.state.data.valorFaixa225.toFixed(2)}</Text>
            :
              <Text style={styles.accordionText}>Faixa 2.25: ISENTO</Text>
            }
            
            {this.state.data.valorFaixa275
            ?
              <Text style={styles.accordionText}>Faixa 2.75: R$ {this.state.data.valorFaixa275.toFixed(2)}</Text>
            :
              <Text style={styles.accordionText}>Faixa 2.75: ISENTO</Text>
            }

            {this.state.data.totalAPagar
            ?
              <Text style={styles.accordionText}>Total a Pagar: R$ {this.state.data.totalAPagar.toFixed(2)}</Text>
            :
              null
            }
            
          </View>
        :
          null
        }

      </View>
    );
  }
}

//md-arrow-dropdown-circle