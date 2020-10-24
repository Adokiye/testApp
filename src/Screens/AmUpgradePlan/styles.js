import { StyleSheet, Dimensions } from 'react-native';

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
    marginBottom: -7,
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
    paddingHorizontal: appSpacing,
    paddingBottom: 40,
  },
});
