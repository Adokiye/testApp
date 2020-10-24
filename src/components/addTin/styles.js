import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const containerPadding = screenWidth * (5 / 100);

const AddTinStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  contentContainer: {
    paddingHorizontal: containerPadding,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    paddingVertical: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: 'Gilroy-Medium',
  },
  inputLabel: {
    color: '#5D6262',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  prefixedInputContainer: {
    flexDirection: 'row',
  },
  prefixedInput: {
    marginLeft: 6,
    flex: 1,
  },
  inputPrefix: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    marginRight: 1,
    paddingTop: 6,
    color: '#aaa',
    lineHeight: 12,
    height: 18,
    marginVertical: 4,
  },
  totalPrice: {
    fontFamily: 'Gilroy-Medium',
    color: '#5D6262',
    marginBottom: 10,
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    width: 120,
    marginRight: 15,
  },
});
export default AddTinStyle;