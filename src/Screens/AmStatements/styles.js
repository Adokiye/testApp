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
    alignItems: 'center',
  },
  screenTitle: {
    color: '#fff',
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    flex: 1,
    paddingRight: 40,
    textAlign: 'center',
    marginBottom: -5,
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
  menuItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuButton: {
    marginBottom: 15,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 17,
    textTransform: 'capitalize',
    color: '#1B003B',
  },
  menuDescription: {
    color: '#FA4A84',
    fontSize: 15,
    fontFamily: 'Gilroy-Medium',
  },
  icon: {
    color: '#9CA0A5',
  },
  mainContent: {
    paddingHorizontal: appSpacing,
  },
});
