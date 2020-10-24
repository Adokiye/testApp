/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ProspaButtonStyle from './styles/prospaButton.style';

export default class ProspaButton extends Component {
  handleClick = () => {
    this.props.handleClick && this.props.handleClick();
  };

  render() {
    const { gradient, text, loading, color, textColor, flex } = this.props;

    return (
      <Fragment>
        {gradient ? (
          <LinearGradient
            style={{
              borderRadius: 8,
              padding: 2,
              flex: flex ? flex : 0,
              height: 48,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#fa4a84', '#bb53f2', '#7e51ff']}>
            <TouchableOpacity
              onPress={this.handleClick}
              style={ProspaButtonStyle().buttonCover}>
              <Text style={ProspaButtonStyle().buttonText}>{text}</Text>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="#270450"
                  style={ProspaButtonStyle().activityIndicator}
                />
              )}
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={this.handleClick}
            disabled={loading}
            style={{
              backgroundColor: color ? color : '#270450',
              paddingHorizontal: 29,
              borderRadius: 8,
              height: 48,
              alignItems: 'center',
              flexDirection: 'row',
              flex: flex ? flex : 0,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: textColor ? textColor : 'white',
                fontFamily: 'Gilroy-Semibold',
                lineHeight: 22,
                height: 22,
                textAlign: 'center',
              }}>
              {text}
            </Text>
            {loading && (
              <ActivityIndicator
                size="small"
                color={color === 'white' ? '#270450' : 'white'}
                style={ProspaButtonStyle().activityIndicator}
              />
            )}
          </TouchableOpacity>
        )}
      </Fragment>
    );
  }
}
