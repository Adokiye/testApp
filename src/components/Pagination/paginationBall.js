import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import PaginationBallStyles from './styles/paginationBall.styles';
import LinearGradient from 'react-native-linear-gradient';

class PaginationBall extends Component {
  render() {
    const {active} = this.props;

    return (
      <Fragment>
        {active ? (
          <LinearGradient
            style={PaginationBallStyles.container}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#fa4a84', '#bb53f2', '#7e51ff']}>
            <View style={PaginationBallStyles.innerBall} />
          </LinearGradient>
        ) : (
          <View style={PaginationBallStyles.altContainer} />
        )}
      </Fragment>
    );
  }
}

export default PaginationBall;
