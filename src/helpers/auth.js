import AsyncStorage from '@react-native-community/async-storage';
import { resetRequest } from '../api/index';

export const storeUserLoginData = async data => {
  const initialData = await AsyncStorage.getItem('user_stats');
  const userData = JSON.parse(initialData);
  const newData = {
    ...userData,
    ...data,
  };

  await AsyncStorage.setItem('user_stats', JSON.stringify(newData));
  await resetRequest();
  return;
};
