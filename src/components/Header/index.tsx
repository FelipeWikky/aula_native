import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import Result from '../../pages/Result';

type Props = {
  title: string,
  isShowBackButton: boolean,
  goToPage?: string,
}

export default function Header(props:Props){
  const navigation = useNavigation();

  function handleGoBack() : void{
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      {
        props.isShowBackButton
          ?
          <TouchableWithoutFeedback
            onPress={handleGoBack}
          >
            <View style={{ marginLeft: 3 }}>
              <Ionicons name="md-arrow-back" size={32} color="white" />
            </View>
          </TouchableWithoutFeedback>
          :
          null
      }
      <Text style={styles.titlePage}>{props?.title}</Text>
    </View>
  );
}