import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Login from './src/modules/screens/login/Login'
import MovieListing from './src/modules/screens/Dashboard/MovieListing'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { myStore, persistor, storePersist } from './src/redux/store/store';
import WatchLater from './src/modules/screens/cart/WatchLater';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
     <Provider store={storePersist}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} title='Log in' 
          options={{headerShown: false}}/>
          <Stack.Screen name="MovieListing" component={MovieListing}
          options={{title: 'Movies'}} />
          <Stack.Screen name="WatchLater" component={WatchLater}
          options={{title: 'Watch Later'}} />
          {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
      </Provider>
    );
  }
}

export default App;