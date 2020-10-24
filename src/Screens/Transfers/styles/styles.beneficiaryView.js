import { StyleSheet, Dimensions } from 'react-native';
import spaces from '../../../helpers/spaces';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  savedText: {
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
    fontSize: 18,
    marginBottom: -5,
  },
  newTransferButton: {
    marginHorizontal: spaces.appSpacing,
    marginTop: spaces.appSpacing,
  },
  savedView: {
    marginTop: 20, // convert to dynamic spacing
    marginBottom: 15,
    marginHorizontal: spaces.appSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  beneficiaryCard: {
    paddingHorizontal: spaces.appSpacing,
  },
  listEmpytText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
});
