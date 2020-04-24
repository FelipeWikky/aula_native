import React from 'react';
import { View, FlatList, Button, AsyncStorage } from 'react-native';

import styles from '../Historic/styles';
import CalcInfo from '../../components/CalcInfo';

import HeaderContext from '../../contexts/HeaderContext';

import Storage from '../../database/storage';

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
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    const data = await Storage.getAll();

    this.setState({ data });
  }

  render(): React.ReactNode {

    return (
      <ResultRender data={this.state.data} />
    );
  }
}

const ResultRender = (props: any) => {
  const {setTitleHeader, showBackButton} = React.useContext(HeaderContext);
  setTitleHeader('Histórico de Cálculos');
  showBackButton(true);

  return (
    <View style={styles.container}>
      <Button title='Limpar Lista' onPress={() => Storage.clean() } />
      <FlatList
        data={props.data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.infoContainer}>
            <CalcInfo data={item} />
          </View>
        )}
      />
    </View>
  );
}