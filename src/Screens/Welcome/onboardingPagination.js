import React, {Component} from 'react';
import {Animated, View, Easing, Dimensions} from 'react-native';
import WelcomePagination from './styles/styles.pagination';

import PaginationBall from '../../components/Pagination/paginationBall';
import ProspaButton from '../../components/Buttons/prospaButton';

const screen = Dimensions.get('screen');

class PaginatedControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appearance: new Animated.Value(0),
    };
  }

  onNextClick = () => {
    this.props.onNextClick.first && this.props.onNextClick.first();
  };

  componentDidMount() {
    Animated.timing(this.state.appearance, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
    }).start();
  }

  componentDidUpdate() {
    if (this.props.viewCount === 2) {
      Animated.timing(this.state.appearance, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
      }).start();
    }
  }

  render() {
    const {viewCount, onNextClick} = this.props;
    const position = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [-73, 0],
    });
    const opacity = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: position,
          opacity: opacity,
          zIndex: 10,
          width: screen.width,
          backgroundColor: 'white',
        }}>
        <View style={WelcomePagination().controlView}>
          <View style={WelcomePagination().paginationView}>
            <PaginationBall active={viewCount === 0} />
            <PaginationBall active={viewCount === 1} />
            <PaginationBall active={viewCount === 2} />
          </View>
          {viewCount >= 1 && (
            <ProspaButton
              gradient={true}
              text="previous"
              handleClick={onNextClick.second}
            />
          )}
          <ProspaButton
            gradient={true}
            text="next"
            handleClick={this.onNextClick}
          />
        </View>
      </Animated.View>
    );
  }
}

export default PaginatedControl;
