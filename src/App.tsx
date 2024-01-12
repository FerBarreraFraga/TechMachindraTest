import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store';
import MainStackNavigator from './navigation/MainStackNavigator';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
