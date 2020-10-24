import { StyleSheet, Dimensions } from 'react-native';
import spaces from '../../../helpers/spaces';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    backgroundColor: '#1B003B',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: spaces.appSpacing,
    marginTop: spaces.appSpacing,
    marginBottom: 20,
  },
  businessName: {
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
    fontSize: 28,
  },
  welcomeText: {
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
    fontSize: 20,
    marginTop: screen.height * (0.616 / 100),
  },
  backWhite: {
    width: screen.width,
    height: screen.height * (70 / 100) - 60,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  accountsList: {
    paddingHorizontal: spaces.appSpacing,
  },
  summary: {
    paddingHorizontal: spaces.appSpacing,
    marginTop: 10,
  },
  accountCard: {
    marginTop: 10,
    marginBottom: 10,
  },
  cardLoader: {
    height: 120,
    marginHorizontal: spaces.appSpacing,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',
  },
});
