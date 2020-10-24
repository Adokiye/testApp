import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');
import spaces from '../../../helpers/spaces';
const appSideSpacing = screen.width * (8 / 100);
export default StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  topButton: {
    margin: appSideSpacing,
    marginBottom: 10,
  },
  listEmpytText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
  savedView: {
    marginTop: 20, // convert to dynamic spacing
    marginBottom: 15,
    marginHorizontal: spaces.appSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedText: {
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
    fontSize: 18,
    marginBottom: -5,
  },
});
