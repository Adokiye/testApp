import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    backgroundColor: '#1B003B',
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    width: screen.width * (84 / 100),
    alignSelf: 'center',
    marginTop: screen.height * (1.84 / 100),
    marginBottom: 5,
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
  parentTransferBar: {
    width: screen.width * (84 / 100),
    height: 30,
    borderWidth: 1,
    borderColor: '#7E51FF',
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: screen.height * (1.23 / 100),
    justifyContent: 'space-between',
  },
  mainWrapper: {
    paddingBottom: 20,
  },
  activeButton: {
    width: screen.width * (41 / 100),
    height: 30,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#7E51FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: '#fff',
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
  },
  inactiveButton: {
    width: screen.width * (41 / 100),
    height: 30,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveText: {
    color: '#7E51FF',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  savedText: {
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
    fontSize: 17,
    width: screen.width * (84 / 100),
    alignSelf: 'center',
    marginTop: screen.height * (3.7 / 100),
    marginBottom: 15,
  },
  backWhite: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 20,
    bottom: 0,
    backgroundColor: 'white',
  },
});
