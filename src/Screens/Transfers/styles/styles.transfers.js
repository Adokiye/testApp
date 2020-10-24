import { StyleSheet, Dimensions } from 'react-native';
import spaces from '../../../helpers/spaces';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    backgroundColor: '#1B003B',
    flex: 1,
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    left: spaces.appSpacing,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: spaces.appSpacing,
    alignItems: 'center',
    marginTop: spaces.appSpacing,
    marginBottom: 25,
  },
  title: {
    color: '#fff',
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    textAlign: 'center',
    zIndex: -20,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  parentTransferBar: {
    marginHorizontal: spaces.appSpacing,
    height: 30,
    borderWidth: 1,
    borderColor: '#7E51FF',
    borderRadius: 4,
    flexDirection: 'row',
    marginTop: screen.height * (1.23 / 100),
    justifyContent: 'space-between',
  },
  activeButton: {
    flex: 1,
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
    height: 30,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inactiveText: {
    color: '#7E51FF',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  beneficiariesView: {
    width: screen.width * (84 / 100),
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: screen.height * (3.7 / 100),
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F1',
  },
  pendingInitialsOval: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA4A84',
    marginRight: screen.width * (4 / 100),
  },
  initialsText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  columnText: {
    flexDirection: 'column',
  },
  transactionNameText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: '#1B003B',
    marginBottom: 5,
  },
  transactionAmountOutText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: '#1B003B',
  },
  transactionTimeText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 10,
    color: '#9CA0A5',
  },
  transactionDetailsView: {
    flexDirection: 'row',
    width: screen.width * (68 / 100),
    justifyContent: 'space-between',
  },
  emptyListText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: '#9CA0A5',
    textAlign: 'center',
    marginTop: 20,
  },
  mainLoader: {
    marginTop: 20,
  },
  backWhite: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: spaces.appSpacing,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
