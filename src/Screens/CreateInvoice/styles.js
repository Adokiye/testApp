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
  inputContainer: {
    marginHorizontal: appSpacing,
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 10,
    color: '#5D6262',
  },
  mainContent: {
    paddingHorizontal: appSpacing,
  },
  itemLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  invoiceItemsList: {
    marginBottom: 15,
  },
  invoiceItem: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 3,
  },
  text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  addAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: appSpacing,
    marginTop: 10,
  },
  plusIcon: {
    backgroundColor: '#aaa',
    width: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    color: '#fff',
  },
  addText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    marginBottom: -5,
  },
  rightEnd: {
    paddingRight: 10,
  },
});
