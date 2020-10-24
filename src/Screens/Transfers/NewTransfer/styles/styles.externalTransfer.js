import { StyleSheet } from 'react-native';
import colors from '../../../../helpers/colors';
import spaces from '../../../../helpers/spaces';

export default StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spaces.appSpacing,
    paddingTop: spaces.appSpacing,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  label: {
    marginBottom: 7,
    color: colors.DEEP_GREY_01,
    fontFamily: 'Gilroy-Medium',
  },
  bankSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  bankSelectorText: {
    fontFamily: 'Gilroy-Medium',
    marginBottom: -4,
    fontSize: 15,
  },
  selector: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bankPicker: {
    backgroundColor: '#fff',
  },
  androidPickerContainer: {
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  selectorClose: {
    alignItems: 'flex-end',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  selectorDoneText: {
    fontFamily: 'Gilroy-Bold',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  lockScreenModal: {
    margin: 0,
  },
  successModal: {
    margin: 0,
  },
});
