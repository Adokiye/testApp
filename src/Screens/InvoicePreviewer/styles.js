import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../helpers/colors';

const screen = Dimensions.get('screen');
const appSpacing = screen.width * (8 / 100);

export default StyleSheet.create({
  container: {
    backgroundColor: '#1B003B',
    flex: 1,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingLeft: 30,
    textAlign: 'center',
    marginBottom: -7,
  },
  nextBtn: {
    backgroundColor: '#7E51FF',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextText: {
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
    fontSize: 18,
    marginBottom: -4,
  },
  backWhite: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    bottom: 0,
    backgroundColor: 'white',
  },
  previewScreen: {
    flex: 2,
    backgroundColor: '#ccc',
  },
  webView: {
    marginHorizontal: 7,
    marginTop: 7,
    paddingBottom: 10,
  },
  previewLoader: {
    flex: 1,
  },
  details: {
    padding: appSpacing,
    borderTopColor: '#aaa',
    borderTopWidth: 1,
  },
  boldText: {
    fontFamily: 'Gilroy-Bold',
  },
  recipient: {
    fontFamily: 'Gilroy-Medium',
  },
  emailLoader: {
    marginLeft: 10,
    marginBottom: -2,
  },
  successModal: {
    backgroundColor: colors.MODAL_PURPLE_OVERLAY,
    padding: 20,
    margin: 0,
  },
  successContent: {
    backgroundColor: 'white',
    padding: 20,
    alignContent: 'center',
    borderRadius: 10,
  },
  modalContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    color: '#3ad29f',
  },
  iconContainer: {
    backgroundColor: '#3ad29f40',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    marginTop: 20,
    color: colors.PRIMARY_PURPLE,
  },
  successButton: {
    marginTop: 20,
    width: '100%',
  },
  recipientTextContainer: {
    flexDirection: 'row',
  },
});
