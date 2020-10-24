import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  imageParentView: {
    width: 40,
    height: 40,
  },
  notificationView: {
    backgroundColor: '#FA4A84',
    position: 'absolute',
    top: 0,
    right: -4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7.5,
    paddingVertical: 2,
    paddingHorizontal: 3,
    minWidth: 15,
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: -2,
  },
  imageView: {
    borderRadius: 40,
    width: 40,
    height: 40,
    borderColor: '#FA4A84',
    borderWidth: 1,
    padding: 0,
    backgroundColor: '#ffffff50',
  },
  image: {
    flex: 1,
    borderRadius: 40,
  },
});
