import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';

const CardScroller = ({ children, breakPoints = [1, 90, 290] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleScroll = e => {
    const index = e.nativeEvent.contentOffset.x;
    setCurrentIndex(index);
  };

  const renderIndicator = () => {
    const dots = [];

    breakPoints.forEach((point, index) => {
      const nextIndex = breakPoints[index + 1];
      const prevIndex = breakPoints[index - 1];

      let activeStyles = {};

      if (!prevIndex && nextIndex > currentIndex) {
        activeStyles = styles.activeDot;
      } else if (point < currentIndex && prevIndex) {
        if (nextIndex && nextIndex > currentIndex) {
          activeStyles = styles.activeDot;
        } else if (!nextIndex && currentIndex > point) {
          activeStyles = styles.activeDot;
        }
      }

      dots.push(<View key={index} style={[styles.dot, activeStyles]} />);
    });
    return <View style={styles.indicatorContainer}>{dots}</View>;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.reportSwiper}
        contentContainerStyle={styles.swiperContent}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {children}
      </ScrollView>
      <View>{renderIndicator()}</View>
    </View>
  );
};

export default CardScroller;
