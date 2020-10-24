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
  button: {
    marginBottom: 20,
    marginTop: 15,
    paddingHorizontal: appSpacing,
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
  recipient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  deleteIcon: {
    padding: 20,
  },
  icon: {},
});
