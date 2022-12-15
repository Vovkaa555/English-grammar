import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import Styles from './HomeScreen.module.scss';
import data from '../data.json';

function HomeScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[Styles.item, backgroundColor]}>
      <Text style={[Styles.item_title, textColor]}>{item.Level}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.Level === selectedId ? '#4b504e' : '#1d3521';
    const color = item.Level === selectedId ? 'white' : 'wheat';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.Level), navigation.navigate('TestList', { level: index });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={Styles.home_block}>
      <View style={Styles.home}>
        <Text style={Styles.home_title}>Choose level:</Text>
        <FlatList
          style={Styles.item_block}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          extraData={selectedId}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
