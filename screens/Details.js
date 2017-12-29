import { Ionicons } from '@expo/vector-icons';
import Expo from 'expo';
import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';

import Footer from '../components/Footer';
import theme, { sizes } from '../components/theme';

const NAV_HEIGHT = 60; //NavigationBar.DEFAULT_HEIGHT + 20;
const HERO_HEIGHT = 440;
const HERO_IMAGE_CONTAINER_HEIGHT = HERO_HEIGHT - 100;

export default class Details extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedColor: 'red', //props.product.selectedColor,
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const { product } = this.props.navigation.state.params;

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
            {this._renderHero(product)}
            <View>
              <Text
                style={[theme.customFont, { margin: sizes.defaultSpacing }]}
              >
                {product.description}
              </Text>
            </View>
          </Animated.ScrollView>
          <Footer
            onPress={() => {
              const url = `http://www.radiifootwear.com/shop/footwear/${
                product.category
              }-${product.title.split(' ').join('-')}`.toLowerCase();
              console.warn(url);
              Linking.openURL(url);
            }}
            buy
          />
        </View>
        {this._renderNavigation(product)}
      </View>
    );
  }

  goBack() {
    this.props.navigation.goBack();
  }

  _renderNavigation(product) {
    return (
      <Animated.View
        style={[styles.navbar, { backgroundColor: product.selectedColor }]}
      >
        <TouchableOpacity onPress={() => this.goBack()}>
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
              {product.category}
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
              {product.title}
            </Text>
            <Text style={[theme.customFont, theme.price]} />
          </Animated.View>
        </View>
        <View style={styles.placeholder} />
      </Animated.View>
    );
  }

  _renderHero(product) {
    // {this._renderColorPicker(product)}

    return (
      <View style={styles.hero}>
        <View style={styles.heroImageContainer}>
          <Animated.Image
            source={product.image}
            style={[theme.image, theme.imageHero]}
          />
        </View>
        <View style={[styles.container]}>
          <Text style={[theme.customFont, theme.title]} numberOfLines={1}>
            {product.title}
          </Text>
          <Text style={[theme.customFont, theme.price]}>{product.price}</Text>
        </View>
      </View>
    );
  }

  _renderColorPicker(product) {
    const inputRange = [0, HERO_IMAGE_CONTAINER_HEIGHT / 2];

    return (
      <Animated.View
        style={[
          styles.colorPickerContainer,
          {
            transform: [
              {
                translateY: this.state.scrollY.interpolate({
                  inputRange: inputRange,
                  outputRange: [0, -30],
                }),
              },
            ],
            opacity: this.state.scrollY.interpolate({
              inputRange,
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <View style={styles.colorPicker}>
          {product.colors.map((color, index) => {
            return (
              <TouchableOpacity
                onPress={this.onColorPress.bind(this, color)}
                key={color + '' + index}
              >
                <View
                  key={index}
                  style={{
                    position: 'relative',
                    marginBottom: sizes.defaultSpacing / 2,
                  }}
                >
                  <View
                    style={[
                      theme.productColorBigBubble,
                      {
                        backgroundColor: color,
                      },
                    ]}
                  />
                  {this.state.selectedColor === color ? (
                    <View
                      style={[
                        theme.productColorBigBubble,
                        theme.selectedBigBubble,
                        {
                          backgroundColor: color,
                        },
                      ]}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  }

  onColorPress(color) {
    return;
    this.setState({ selectedColor: color });
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

  productDetailsContainer: {
    paddingTop: NAV_HEIGHT,
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
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
