import React, {Component, Fragment} from 'react';
import LockScreenBall from './lockScreenBall';
import Keypad from './keyPad';

class PinInputKeypad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueList: [],
    };
  }

  onKeyPress = value => {
    let valueList = this.state.valueList;
    if (valueList.length < 4) {
      valueList.push(value);
      this.setState({valueList: valueList});
    }
  };

  onClear = () => {
    let valueList = this.state.valueList;
    if (valueList.length > 0) {
      valueList.pop();
      this.setState({valueList: valueList});
    }
  };

  render() {
    const {valueList} = this.state;
    //console.log(valueList, '<<<<>>>>');
    return (
      <Fragment>
        <LockScreenBall listValue={valueList} />
        <Keypad onKeyPress={this.onKeyPress} onClear={this.onClear} />
      </Fragment>
    );
  }
}

export default PinInputKeypad;
