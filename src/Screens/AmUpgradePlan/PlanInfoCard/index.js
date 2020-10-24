import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import ButtonOutline from '../../../components/Buttons/buttonOutline';
import styles from './styles';
import ShadowView from '../../../components/ShadowView';

const PlanInfoCard = ({type, features, info, subscript, name, changePlan = () => {}}) => {
  return (
    <ShadowView style={styles.container}>
      <View>
        <Text style={styles.type}>{type}</Text>
        <Text>
          <Text style={styles.mainInfo}>{info}</Text>
          <Text style={styles.subscript}>{subscript}</Text>
        </Text>
        <FlatList
                  data={features}
                  renderItem={({ item, index }) => (
                    <Text style={styles.bank}>{item}</Text>
                )}
                  keyExtractor={(item, index) => item + index}
                />
          <ButtonOutline
                text={"Choose " + name}
                onPress={()=>changePlan(name.toLowerCase())
                  //       console.log("nav")
                }
              />
      </View> 
    </ShadowView>
  );
};

export default PlanInfoCard;
