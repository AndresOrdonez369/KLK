import React from 'react';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
import Navigation from './src/navigation/appInitialNavigation';
import store from './src/redux/store';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
