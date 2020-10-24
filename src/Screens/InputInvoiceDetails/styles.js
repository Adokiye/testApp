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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextBtn: {
    backgroundColor: '#7E51FF',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  nextText: {
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
    fontSize: 18,
    marginBottom: -4,
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
  contentContainer: {
    paddingHorizontal: appSpacing,
  },
  formSection: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  half: {
    flex: 1,
  },
  inputBox: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    paddingVertical: 5,
  },
  dueDate: {
    color: '#FA4A84',
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
  },
  datePick: {
    paddingVertical: 10,
  },
  currencySign: {
    fontSize: 14,
  },
  text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    marginLeft: 10,
    fontSize: 17,
  },
});
