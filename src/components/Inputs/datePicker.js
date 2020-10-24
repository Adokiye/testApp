import React, { Fragment, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  View,
  SafeAreaView,
} from 'react-native';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import DatePickerStyle from './styles/datePicker.style';

const DatePicker = ({ value: selectedDate, onSelect = () => {} }) => {
  const [date, setDate] = React.useState(selectedDate);
  const [dateString, setDateString] = React.useState('');
  const [pickerVisibility, setPickerVisibility] = React.useState(false);

  const changeDate = (e, newDate) => {
    newDate = newDate || date;
    setDate(newDate);
  };

  const selectDate = () => {
    closePicker();
    onSelect(date);
  };

  const closePicker = () => {
    setPickerVisibility(false);
  };

  const openPicker = () => {
    setPickerVisibility(true);
  };

  useEffect(() => {
    setDateString(Moment(selectedDate).format('DD MMMM, YYYY'));
  }, [selectedDate]);

  return (
    <Fragment>
      <TouchableOpacity onPress={openPicker} style={DatePickerStyle.container}>
        <Text style={DatePickerStyle.text1}>{dateString}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={pickerVisibility}>
        <View style={DatePickerStyle.view1}>
          <SafeAreaView style={DatePickerStyle.content}>
            <View style={DatePickerStyle.view2}>
              <Text onPress={selectDate} style={DatePickerStyle.text2}>
                Done
              </Text>
            </View>
            <DateTimePicker mode="date" value={date} onChange={changeDate} />
          </SafeAreaView>
        </View>
      </Modal>
    </Fragment>
  );
};

export default DatePicker;
