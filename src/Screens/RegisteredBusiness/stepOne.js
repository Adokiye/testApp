import React, {Component, Fragment} from 'react';
import {View, Text, Switch, ActivityIndicator} from 'react-native';
import ShadowCard from '../../components/Cards/registerUserCard';

// refactor this userInput component
import UserInput from '../CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import {connect} from 'react-redux';
import {
  handleStepOne,
  getCategories,
} from '../../actions/registeredBusiness.action';
import AsyncStorage from '@react-native-community/async-storage';
import IndexStyle from './styles/styles.index';

class RegisteredBusinessStepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      selectedCategory: '',
      description: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user_stats').then(data => {
      const {token} = JSON.parse(data);
      this.props.getCategories(token).then(() => {
        this.setState({
          selectedCategory: this.props.categories.data[0].category_id,
        });
      });
    });
  }

  onSubmit = () => {
    const data = {
      'trading name': this.state.businessName,
      'business category': this.state.selectedCategory,
      description: this.state.description,
    };
    this.props.handleStepOne(data);
  };

  render() {
    const {useAsAccountName, selectedCategory} = this.state;
    const {loading, categories} = this.props;

    return (
      <ShadowCard>
        <Text style={IndexStyle().title}>
          please tell us more about your{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>business</Text>
        </Text>
        {categories.loading ? (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <ActivityIndicator size="small" color="#270450" />
          </View>
        ) : (
          <Fragment>
            <UserInput
              label="Trading name"
              placeholder="your business name"
              onTextInput={data => this.setState({businessName: data})}
            />
            <UserInput
              picker={true}
              label="Business category"
              selected_option={selectedCategory}
              options={categories.data}
              onOptionSelect={value => this.setState({selectedCategory: value})}
              option_label="category_name"
              option_value="category_id"
            />
            {/* <UserInput
              label="Business RC number"
              placeholder="e.g 23132323"
              onTextInput={data => this.setState({tradingName: data})}
            /> */}
            <UserInput
              label="Description"
              placeholder="Business Description"
              onTextInput={data => this.setState({description: data})}
            />
            <View style={{flexDirection: 'row'}}>
              <ProspaButton
                gradient={true}
                text="next"
                handleClick={this.onSubmit}
                loading={loading}
              />
            </View>
          </Fragment>
        )}
      </ShadowCard>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleStepOne: data => dispatch(handleStepOne(data, ownProps.nextSlide)),
    getCategories: token => dispatch(getCategories(token)),
  };
};

const mapStateToProps = state => {
  const {registeredAccountCreation} = state;
  const {loading, categories} = registeredAccountCreation;

  return {
    loading,
    categories,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisteredBusinessStepOne);
