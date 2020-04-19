import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default class App extends React.Component<any, any>{
  render():React.ReactNode {
    return(
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    );
  }
}
