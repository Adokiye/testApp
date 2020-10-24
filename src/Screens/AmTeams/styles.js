import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');
import spaces from '../../helpers/spaces';
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
  selector: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bankPicker: {
    backgroundColor: '#fff',
  },
  selectorClose: {
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  selectorDoneText: {
    fontFamily: 'Gilroy-Bold',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  screenTitle: {
    color: '#fff',
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    flex: 1,
    paddingRight: 40,
    textAlign: 'center',
    marginBottom: -5,
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
  actionButton: {
    paddingHorizontal: appSpacing,
    marginBottom: 20,
  },
  icon: {
    color: '#9CA0A5',
  },
  listEmpytText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
});
