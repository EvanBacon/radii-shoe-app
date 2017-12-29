import { Ionicons } from '@expo/vector-icons';
import Expo from 'expo';
import React from 'react';
import {
  Animated,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Footer from '../components/Footer';
import theme, { sizes } from '../components/theme';

const NAV_HEIGHT = 60;
const HERO_HEIGHT = 440;
const HERO_IMAGE_CONTAINER_HEIGHT = HERO_HEIGHT - 100;

export default class Details extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    scrollY: new Animated.Value(0),
  };

  render() {
    const { shoe } = this.props.navigation.state.params;

    return (
      <View style={[styles.container, { backgroundColor: 'white' }]}>
        <View
          style={{ flex: 1, width: sizes.screenWidth, marginTop: NAV_HEIGHT }}
        >
          <Animated.ScrollView
            contentContainerStyle={[styles.contentContainer]}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true },
            )}
          >
            {this.renderHero(shoe)}
            <View>
              <Text
                style={[theme.customFont, { margin: sizes.defaultSpacing }]}
              >
                {shoe.description}
              </Text>
            </View>
          </Animated.ScrollView>
          <Footer
            onPress={() => {
              const url = `http://www.radiifootwear.com/shop/footwear/${
                shoe.category
              }-${shoe.title.split(' ').join('-')}`.toLowerCase();
              console.warn(url);
              Linking.openURL(url);
            }}
            buy
          />
        </View>
        {this.renderNavigation(shoe)}
      </View>
    );
  }

  renderNavigation(shoe) {
    return (
      <Animated.View style={styles.navbar}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Ionicons
            name="ios-arrow-round-back-outline"
            size={38}
            style={[styles.placeholder, styles.backButton]}
            color={'#999'}
          />
        </TouchableOpacity>
        <View style={[styles.container, styles.navigationDetails]}>
          <Animated.View
            style={[
              theme.newLabel,
              theme.greenTheme,
              {
                top: (NAV_HEIGHT - sizes.newLabelHeight) / 2,
                zIndex: 2,
                transform: [
                  {
                    translateY: this.state.scrollY.interpolate({
                      inputRange: [
                        -1,
                        HERO_HEIGHT - NAV_HEIGHT * 2,
                        HERO_HEIGHT - NAV_HEIGHT,
                      ],
                      outputRange: [0, 0, -NAV_HEIGHT],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={[theme.newLabelText, theme.customFont]}>
              {shoe.category}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.container,
              {
                opacity: this.state.scrollY.interpolate({
                  inputRange: [
                    -1,
                    0,
                    HERO_HEIGHT - NAV_HEIGHT,
                    HERO_HEIGHT + 1,
                  ],
                  outputRange: [0, 0, 0, 1],
                }),
                transform: [
                  {
                    translateY: this.state.scrollY.interpolate({
                      inputRange: [
                        0,
                        HERO_HEIGHT / 2,
                        HERO_HEIGHT,
                        HERO_HEIGHT + 1,
                      ],
                      outputRange: [NAV_HEIGHT, NAV_HEIGHT, 0, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={[theme.customFont, theme.title]} numberOfLines={1}>
              {shoe.title}
            </Text>
            <Text style={[theme.customFont, theme.price]} />
          </Animated.View>
        </View>
        <View style={styles.placeholder} />
      </Animated.View>
    );
  }

  renderHero(shoe) {
    return (
      <View style={styles.hero}>
        <View style={styles.heroImageContainer}>
          <Animated.Image
            source={shoe.image}
            style={[theme.image, styles.imageHero]}
          />
        </View>
        <View style={[styles.container]}>
          <Text style={[theme.customFont, theme.title]} numberOfLines={1}>
            {shoe.title}
          </Text>
          <Text style={[theme.customFont, theme.price]}>{shoe.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBarAction: {
    width: sizes.placeholderSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: sizes.placeholderSize,
  },

  shoeDetailsContainer: {
    paddingTop: NAV_HEIGHT,
  },
  imageHero: {
    width: 340,
    height: 340,
    resizeMode: 'contain',
  },

  navbar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAV_HEIGHT,
    overflow: 'hidden',
    paddingTop: Expo.Constants.statusBarHeight,
    alignItems: 'center',
    paddingHorizontal: sizes.defaultSpacing,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navigationDetails: {
    height: NAV_HEIGHT,
    // position: 'relative',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  // Hero
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HERO_HEIGHT,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  colorPicker: {
    padding: sizes.defaultSpacing / 2,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0,
    borderColor: '#eee',
  },
  heroImageContainer: {
    height: HERO_IMAGE_CONTAINER_HEIGHT,
  },
  colorPickerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: HERO_IMAGE_CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  footer: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
