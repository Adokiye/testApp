import { StyleSheet } from 'react-native';
import spaces from '../../../../helpers/spaces';
import colors from '../../../../helpers/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spaces.appSpacing,
  },
  sectionContainer: {
    paddingTop: spaces.appSpacing,
  },
  label: {
    marginBottom: 7,
    color: colors.DEEP_GREY_01,
    fontFamily: 'Gilroy-Medium',
  },
  selectorModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  selectorContainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    maxHeight: '90%',
  },
  selectorHeader: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: spaces.appSpacing,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectorHeadingText: {
    fontFamily: 'Gilroy-Medium',
    flex: 1,
    textAlign: 'center',
    color: colors.DEEP_GREY_01,
    fontSize: 17,
    marginBottom: -5,
  },
  selectorModalContent: {
    paddingVertical: 20,
  },
  selectorOption: {
    paddingVertical: 10,
    paddingHorizontal: spaces.appSpacing,
  },
});
