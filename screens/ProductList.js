import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');
import Button from '../components/button';
import theme from '../components/theme';
import AppRouter from '../AppRouter';

import Images from '../Images';
import Shoes from '../Shoes';

const PRODUCT_LIST = Object.keys(Shoes).map(key => {
  const shoe = Shoes[key];

  return {
    ...shoe,
    title: shoe.name,
    sale: shoe.sale ? `SALE: ${shoe.sale}.00 ${shoe.format}` : null,
    price: `${shoe.price}.00 ${shoe.format}`,
    // selectedColor: shoe.colors[0],
  };
});

const PADDING = 40;
const INDICATOR_CONTAINER_HEIGHT = 2;
const INDICATOR_CONTAINER_WIDTH = width - PADDING * 2;
const INDICATOR_WIDTH = INDICATOR_CONTAINER_WIDTH / PRODUCT_LIST.length;

// @withNavigation
export default class ProductList extends React.Component {
  _placeHeaderGroups = {};
  static route = {
    navigationBar: {
      title: 'Products',
      backgroundColor: 'rgba(255, 255, 255, .5)',
      visible: false,
    },
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedId: 0,
      scrollX: new Animated.Value(0),
      indicator: new Animated.Value(1),
    };
  }

  render() {
    return (
      <ImageBackground
        source={Images.stretch}
        resizeMode="cover"
        style={[theme.container, theme.bg]}
      >
        <Animated.ScrollView
          pagingEnabled
          scrollEventThrottle={16}
          contentContainerStyle={[ss.contentContainer]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
            { useNativeDriver: true },
          )}
        >
          {PRODUCT_LIST.map((product, index) =>
            this._renderRow(product, index),
          )}
        </Animated.ScrollView>
        <Animated.View style={ss.indicatorContainer}>
          <Animated.View
            style={[ss.indicator, { left: this.state.indicator }]}
          />
        </Animated.View>
      </ImageBackground>
    );
  }

  componentDidMount() {
    this.state.scrollX.addListener(this.updateView.bind(this));
  }

  updateView(offset) {
    let currentIndex = offset.value / width;
    if (offset.value < 0) {
      currentIndex = 0;
    } else if (offset.value > (PRODUCT_LIST.length - 1) * width) {
      currentIndex = PRODUCT_LIST.length - 1;
    }

    this.state.indicator.setValue(currentIndex * INDICATOR_WIDTH);
  }

  _renderRow(product, i) {
    let inputRange = [
      (i - 1) * width,
      i * width,
      (i + 1) * width,
      (i + 2) * width,
    ];

    return (
      <View style={[theme.container, ss.productItem]} key={i}>
        <View style={ss.innerContainer}>
          <View
            style={[theme.newLabel, theme.absoluteTopLeft, theme.greenTheme]}
          >
            <Text style={[theme.newLabelText, theme.customFont]}>
              {product.category}
            </Text>
          </View>
          <Animated.Image
            source={product.image}
            style={[
              theme.image,
              {
                transform: [
                  {
                    scale: this.state.scrollX.interpolate({
                      inputRange,
                      outputRange: [0.3, 0.98, 0.3, 0.3],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={[theme.customFont, theme.title]}>{product.title}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}
          >
            {product.colors.map((color, index) => {
              return (
                <View
                  key={index}
                  style={{
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={[
                      theme.productColorBubble,
                      {
                        backgroundColor: color,
                      },
                    ]}
                  />
                  {product.selectedColor === color ? (
                    <View
                      style={[
                        theme.productColorBubble,
                        theme.selectedBubble,
                        {
                          backgroundColor: color,
                        },
                      ]}
                    />
                  ) : null}
                </View>
              );
            })}
          </View>

          <Text
            style={[
              theme.customFont,
              theme.price,
              product.sale && { color: 'red' },
            ]}
          >
            {product.sale || product.price}
          </Text>

          {this._renderProductFooter(product, i)}
        </View>
      </View>
    );
  }

  _renderProductFooter(product, i) {
    return (
      <View style={[theme.groupButton, ss.footer]}>
        <Button
          onPress={() => this.onProductListPress(product, i)}
          theme="light"
        >
          ANALYZE
        </Button>
        <Button
          onPress={() => this.onProductListPress(product, i)}
          theme="light"
        >
          ACQUIRE
        </Button>
      </View>
    );
  }

  onProductListPress(product, index) {
    // this.props.navigator.push(
    //   AppRouter.getRoute('productDetails', {
    //     product,
    //   }),
    //   {
    //     transitionGroup: this._placeHeaderGroups[index],
    //   }
    // );
  }
}

const ss = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productItem: {
    width: width,
    padding: 40,
  },
  footer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  indicator: {
    width: INDICATOR_WIDTH,
    height: INDICATOR_CONTAINER_HEIGHT,
    position: 'absolute',
    top: 0,
    backgroundColor: '#c0c0c0',
  },
  indicatorContainer: {
    height: INDICATOR_CONTAINER_HEIGHT,
    marginVertical: 20,
    backgroundColor: '#ededed',
    position: 'relative',
    width: INDICATOR_CONTAINER_WIDTH,
    paddingHorizontal: PADDING,
  },
});
