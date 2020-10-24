import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import RegisterUserCard from '../../components/Cards/registerUserCard';
// import UserInputs from '../CustomerRegister/userInputs';
import UserInputs from '../../Screens/CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';

const InviteCode = props => {
  const {
    modalVisibility,
    modalToggle,
    loading,
    skipButton,
    submitButton,
    onTextInput,
  } = props;

  return (
    <Modal
      isVisible={modalVisibility}
      onBackdropPress={modalToggle}
      hideModalContentWhileAnimating={true}>
      <RegisterUserCard>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Medium',
            color: '#270450',
            lineHeight: 28,
            marginBottom: 29,
          }}>
          Place your{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>invite code</Text>
        </Text>
        <UserInputs
          label="Invite code"
          placeholder="Optional"
          onTextInput={onTextInput}
        />
        <View style={{flexDirection: 'row'}}>
          {/* this should hide the modal and submit */}
          <View style={{marginRight: 12}}>
            <ProspaButton
              gradient={true}
              text="Skip"
              loading={loading}
              handleClick={skipButton}
            />
          </View>
          <ProspaButton
            gradient={true}
            text="Enter"
            loading={loading}
            handleClick={submitButton}
          />
        </View>
      </RegisterUserCard>
    </Modal>
  );
};

export default InviteCode;
