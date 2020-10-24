import React from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export default ({ name = '', size = 10, color = '' }) => (
  <Icon name={name} size={size} color={color} />
);
