import React from 'react';
import { TextInput, View, ActivityIndicator } from 'react-native';
import styles from './styles/outlineInput';
import { formatCurrencyInline } from '../../helpers/thousandSeparator';

const OutlineInput = ({
  value,
  onChange = () => {},
  onBlur: customBlurFunction = () => {},
  money,
  isLoading,
  ...props
}) => {
  const [extraStyles, setExtraStyles] = React.useState({});
  let focusStyles = {
    borderColor: '#707070',
  };

  const onFocus = () => {
    setExtraStyles(focusStyles);
  };

  const onBlur = () => {
    setExtraStyles({});
    customBlurFunction();
  };

  const onChangeText = text => {
    // if (money) {
    //   return onChange(formatCurrencyInline(text));
    // }
    return onChange(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.inputBox, extraStyles]}
        {...props}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isLoading && <ActivityIndicator style={styles.activityIndicator} />}
    </View>
  );
};

export default OutlineInput;
