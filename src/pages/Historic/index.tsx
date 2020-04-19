import React from 'react';
import { View, FlatList } from 'react-native';

import styles from '../Historic/styles';
import Header from '../../components/Header';
import CalcInfo from '../../components/CalcInfo';

import GenerateId from '../../utils/GenerateId';

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

export default class Historic extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state={
      data:[]
    }
  }
  componentDidMount() {
    const data = [
      {
        id:GenerateId(),
        name: 'Felipe',
        ganhoAnual: 12500,
        valorFaixaIsento: 11500,
      },
      {
        id:GenerateId(),
        name: 'Lucas',
        ganhoAnual: 24510,
        valorFaixaIsento: 22304.10,
      },
      {
        id:GenerateId(),
        name: 'Maurício',
        ganhoAnual: 41654,
        valorFaixaIsento: 22847.76,
        valorFaixa075: 11072.04,
        valorFaixa150: 3152.26,
        valorFaixa225: 10292.89,
        totalAPagar: 4810.22
      },
      {
        id: GenerateId(),
        name: 'Alfonso',
        ganhoAnual: 62141,
        valorFaixaIsento: 22847.76,
        valorFaixa075: 11072.04,
        valorFaixa150: 11092.80,
        valorFaixa225: 10292.89,
        totalAPagar: 1303.24
      },
      {
        id: GenerateId(),
        name: 'Drake',
        ganhoAnual: 87989,
        valorFaixaIsento: 22847.86,
        valorFaixa075: 11072.04,
        valorFaixa150: 11092.80,
        valorFaixa225: 10963.56,
        valorFaixa275: 23662.43,
        totalAPagar: 11468.29
      },
    ];

    this.setState({data});
  }

  render(): React.ReactNode {

    return (
      <>
        <Header title='Histórico de Cálculos'  isShowBackButton={true} />

        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.infoContainer}>
                <CalcInfo data={item} />
              </View>
            )}
          />
        </View>
      </>
    );
  }
}