import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');
const appSideSpacing = screen.width * (8 / 100);

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
  },

  reportSwiper: {
    height: 120,
    paddingLeft: appSideSpacing,
    paddingTop: 5,
  },
  swiperContent: {
    paddingRight: appSideSpacing + 15,
  },
  dot: {
    backgroundColor: '#E6E6E6',
    height: 5,
    width: 5,
    borderRadius: 12,
    marginRight: 3,
  },
  activeDot: {
    height: 5,
    width: 13,
    backgroundColor: '#FA4A84',
    borderRadius: 12,
    marginRight: 3,
  },
});
