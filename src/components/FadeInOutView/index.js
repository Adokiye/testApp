import React from 'react';
import { Animated } from 'react-native';

const FadeInOutView = props => {
  const opacity = props.isShown ? 0 : 1;
  const duration = props.duration || 500;
  const [opacityValue] = React.useState(new Animated.Value(opacity));

  React.useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: props.isShown ? 1 : 0,
      duration,
    }).start();
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: opacityValue,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInOutView;
