import React from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const screenHeight = Dimensions.get('screen').height;

const SlideUpInView = props => {
  const [paddingTop] = React.useState(new Animated.Value(screenHeight));
  const [opacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
    }).start();
    Animated.timing(paddingTop, {
      toValue: 0,
      easing: Easing.elastic(),
      duration: 800,
    }).start();
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        paddingTop,
        opacity,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default SlideUpInView;
