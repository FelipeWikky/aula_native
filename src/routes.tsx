import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Result from './pages/Result';
import Historic from './pages/Historic';

import Header from './components/Header';

class Routes extends React.Component {
  render(): React.ReactNode {

    const Stack = createStackNavigator();

    return (
      <>
        <Stack.Navigator
          headerMode='screen'
          initialRouteName='Home'
          screenOptions={{ header: props => <Header title='' isShowBackButton={false}/> }}
        >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Result' component={Result} />
          <Stack.Screen name='Historic' component={Historic} />
        </Stack.Navigator>
      </>
    );
  }
}

export default Routes;