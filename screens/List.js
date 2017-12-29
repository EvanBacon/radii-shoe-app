import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Footer from '../components/Footer';
import theme from '../components/theme';
import Images from '../Images';
import Shoes from '../Products';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const { height, width } = Dimensions.get('window');
const PADDING = 40;
const INDICATOR_CONTAINER_HEIGHT = 4;
const INDICATOR_CONTAINER_WIDTH = height - PADDING * 2;
const INDICATOR_WIDTH = INDICATOR_CONTAINER_WIDTH / Shoes.length;

export default class List extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedId: 0,
    scrollY: new Animated.Value(0),
    indicator: new Animated.Value(1),
  };

  render() {
    return (
      <ImageBackground
        source={Images.stretch}
        resizeMode="cover"
        style={[theme.container, theme.bg, { flexDirection: 'row' }]}
      >
        <AnimatedFlatlist
          pagingEnabled
          renderScrollComponent={props => <Animated.ScrollView {...props} />}
          scrollEventThrottle={1}
          horizontal={false}
          style={{ flex: 1 }}
          data={Shoes}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        />
        <Animated.View style={styles.indicatorContainer}>
          <Animated.View
            style={[styles.indicator, { top: this.state.indicator }]}
          />
        </Animated.View>
      </ImageBackground>
    );
  }

  componentDidMount() {
    this.state.scrollY.addListener(this.updateView.bind(this));
  }

  updateView(offset) {
    let currentIndex = offset.value / height;
    if (offset.value < 0) {
      currentIndex = 0;
    } else if (offset.value > (Shoes.length - 1) * height) {
      currentIndex = Shoes.length - 1;
    }

    this.state.indicator.setValue(currentIndex * INDICATOR_WIDTH);
  }

  renderItem = ({ item: shoe, index }) => {
    let inputRange = [
      (index - 1) * height,
      index * height,
      (index + 1) * height,
      (index + 2) * height,
    ];

    const translation = 600;

    const translateY = this.state.scrollY.interpolate({
      inputRange,
      outputRange: [-translation, 0, translation, translation],
    });

    const opacity = this.state.scrollY.interpolate({
      inputRange,
      outputRange: [-1, 1, -1, -1],
    });

    const metaTranslateY = this.state.scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, translation * 0.35, translation],
    });

    return (
      <View style={[theme.container, styles.shoeItem]}>
        <View style={styles.innerContainer}>
          <View
            style={[theme.newLabel, theme.absoluteTopLeft, theme.greenTheme]}
          >
            <Text style={[theme.newLabelText, theme.customFont]}>
              {shoe.category}
            </Text>
          </View>
          <Animated.Image
            source={shoe.image}
            style={[
              theme.image,
              {
                transform: [
                  {
                    scale: this.state.scrollY.interpolate({
                      inputRange,
                      outputRange: [0.3, 0.95, 0.3, 0.3],
                    }),
                  },
                  {
                    translateY,
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              opacity,
              transform: [{ translateY: metaTranslateY }],
            }}
          >
            <Text style={[theme.customFont, theme.title]}>{shoe.title}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}
            >
              {shoe.colors.map((color, index) => {
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
                        theme.shoeColorBubble,
                        {
                          backgroundColor: color,
                        },
                      ]}
                    />
                    {shoe.selectedColor === color ? (
                      <View
                        style={[
                          theme.shoeColorBubble,
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
                shoe.sale && { color: 'red' },
              ]}
            >
              {shoe.sale || shoe.price}
            </Text>
          </Animated.View>
          <Footer
            onPress={index =>
              this.props.navigation.navigate('Details', { shoe })
            }
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  innerContainer: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    borderRadius: 4,
    borderTopLeftRadius: width / 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  shoeItem: {
    width: width,
    height: height,
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
    height: INDICATOR_WIDTH,
    borderRadius: INDICATOR_CONTAINER_HEIGHT / 2,
    width: INDICATOR_CONTAINER_HEIGHT,
    position: 'absolute',
    left: 0,
    backgroundColor: '#000000',
  },
  indicatorContainer: {
    width: INDICATOR_CONTAINER_HEIGHT,
    borderRadius: INDICATOR_CONTAINER_HEIGHT / 2,
    marginRight: 10,
    backgroundColor: '#ededed',
    position: 'relative',
    height: INDICATOR_CONTAINER_WIDTH,
    paddingVertical: PADDING,
  },
});
