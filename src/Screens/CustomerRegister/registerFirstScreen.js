import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RegisterUserCard from '../../components/Cards/registerUserCard';
import UserInputs from './userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import registerBVNStyle from './styles/styles.registerBVN';

export default class RegistrationFirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bvn: '',
    };
  }

  handleSubmit = () => {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});

    let data = {
      BVN: this.state.bvn,
    };

    this.props
      .handleStep1(data)
      .then(() => {
        this.setState({loading: false});
        this.props.nextSlide();
      })
      .catch(error => {
        this.setState({loading: false});
      });
  };

  updateInputValue = (field, value) => {
    let data = {};
    data[field] = value;
    this.setState(data);
  };

  render() {
    const {loading} = this.state;

    return (
      <RegisterUserCard>
        <Text style={registerBVNStyle.headerText}>
          let’s get you <Text style={registerBVNStyle.font}>started </Text>
          with <Text style={registerBVNStyle.font}>prospa</Text>
        </Text>
        <UserInputs
          label="BVN"
          type="numeric"
          placeholder="1234567890"
          onTextInput={value => this.updateInputValue('bvn', value)}
        />
        <Text style={registerBVNStyle.text}>
          Please enter your BVN so we can get to know you and verify your
          identity
        </Text>
        <View style={{flexDirection: 'row'}}>
          <ProspaButton
            text="next"
            flex={false}
            handleClick={this.handleSubmit}
            loading={loading}
          />
        </View>
      </RegisterUserCard>
    );
  }
}
