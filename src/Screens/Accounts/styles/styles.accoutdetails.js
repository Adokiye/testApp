import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    backgroundColor: '#1B003B',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screen.width * (84 / 100),
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    marginBottom: -7,
    flex: 1,
    textAlign: 'center',
    marginRight: 25,
    textTransform: 'capitalize',
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
    marginTop: screen.height * (2.7 / 100),
    marginBottom: 25,
    justifyContent: 'space-between',
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
  backWhite: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'white',
  },
});
