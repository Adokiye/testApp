import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');
const appSpacing = screen.width * (8 / 100);

export default StyleSheet.create({
  container: {
    backgroundColor: '#1B003B',
    flex: 1,
  },
  header: {
    width: screen.width * (84 / 100),
    alignSelf: 'center',
    marginTop: screen.height * (1.84 / 100),
    marginBottom: 15,
  },
  textView: {
    width: screen.width * (84 / 100),
    alignSelf: 'center',
  },
  welcomeText: {
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
    fontSize: 32,
  },
  backWhite: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 20,
    bottom: 0,
    backgroundColor: 'white',
    paddingTop: appSpacing,
  },
  mainContent: {
    paddingBottom: 30,
  },
  inputContainer: {
    marginHorizontal: appSpacing,
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 10,
    color: '#5D6262',
  },
  roleSelector: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: 16,
    padding: 15,
    color: '#1B003B',
  },
  roleSelectorText: {
    fontFamily: 'Gilroy-Medium',
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
    lineHeight: 16,
    height: 16,
    color: '#270450',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: '#eef0f1',
    borderBottomWidth: 1,
  },
  pickerAndroid: {
    // width: screen.width,
    // marginLeft: -20,
  },
});
