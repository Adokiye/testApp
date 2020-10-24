import React, {Component, Fragment} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import RegisterUserCard from '../../components/Cards/registerUserCard';
import UserInputs from '../CustomerRegister/userInputs';
import * as actions from '../../actions/unregisteredBusiness.action';
import ProspaButton from '../../components/Buttons/prospaButton';

class UnregisteredBusinessStepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessCategory: '',
      businessName: '',
      description: '',
    };
  }

  componentDidMount() {
    this.props.getCategories().then(() => {
      const {categories} = this.props;
      //set default selected category
      this.setState({businessCategory: categories.data[0].category_id});
    });
  }

  onSubmit = () => {
    const data = {
      'business name': this.state.businessName,
      'business category': this.state.businessCategory,
      description: this.state.description,
    };

    if (!this.props.loading) {
      this.props.handleStep1(data);
    }
  };

  render() {
    const {loading, categories} = this.props;

    return (
      <RegisterUserCard>
        {/* <Text style={{
          textAlign: 'center'
        }}>Unregistered</Text> */}
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Medium',
            color: '#270450',
            lineHeight: 28,
            marginBottom: 29,
          }}>
          please tell us more about your{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>business</Text>
        </Text>
        {categories.loading ? (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <ActivityIndicator size="small" color="#270450" />
          </View>
        ) : (
          <Fragment>
            <UserInputs
              label="Trading Name"
              placeholder="ABC Foods"
              onTextInput={businessName => this.setState({businessName})}
            />
            <UserInputs
              label="Business category"
              picker={true}
              options={categories.data}
              option_label="category_name"
              option_value="category_id"
              selected_option={this.state.businessCategory}
              onOptionSelect={businessCategory =>
                this.setState({businessCategory})
              }
            />
            <UserInputs
              label="Description"
              placeholder="Describe your business"
              onTextInput={description => this.setState({description})}
            />
            <View style={{flexDirection: 'row'}}>
              <ProspaButton
                gradient={true}
                text="next"
                loading={loading}
                handleClick={this.onSubmit}
              />
            </View>
          </Fragment>
        )}
      </RegisterUserCard>
    );
  }
}

const mapStateToProps = state => {
  const {unregisteredAccountCreation} = state;
  const {loading, categories} = unregisteredAccountCreation;

  return {
    loading,
    categories,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: () => dispatch(actions.getCategories()),
    handleStep1: data =>
      dispatch(actions.handleStep1(data, ownProps.nextSlide)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnregisteredBusinessStepOne);
