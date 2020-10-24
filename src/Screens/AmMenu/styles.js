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
    justifyContent: 'flex-end',
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
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: appSpacing,
    paddingVertical: 15,
    borderColor: '#EEF0F1',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  menuText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 17,
    color: '#1B003B',
  },
  icon: {
    color: '#1B003B',
  },
});
