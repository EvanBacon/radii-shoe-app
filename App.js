import Expo, { Font } from 'expo';
import React from 'react';

import Navigation from './Navigation';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      ARCADECLASSIC: require('./assets/fonts/ARCADECLASSIC.ttf'),
    });

    this.setState({
      fontLoaded: true,
    });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />;
    }
    // return <ProductDetails product={Products[0]} />;
    return <Navigation />;
  }
}
