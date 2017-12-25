import Expo, { Font } from 'expo';
import React from 'react';
import { View } from 'react-native';
// import {
//   NavigationProvider,
//   StackNavigation,
//   SharedElementOverlay,
// } from '@expo/ex-navigation'; // 2.9.1

// import AppRouter from './AppRouter';

import ProductList from './screens/ProductList';
import styles from './components/theme';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      SkyhookMono: require('./assets/fonts/SkyhookMono.ttf'),
    });

    this.setState({
      fontLoaded: true,
    });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />;
    }

    return <ProductList />;
    // return (
    //   <View style={[styles.container]}>
    //     <NavigationProvider router={AppRouter}>
    //       <SharedElementOverlay>
    //         <StackNavigation
    //           id="root"
    //           initialRoute={AppRouter.getRoute('productList')}
    //         />
    //       </SharedElementOverlay>
    //     </NavigationProvider>
    //   </View>
    // );
  }
}
