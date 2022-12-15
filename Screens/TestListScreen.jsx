import React, { useState } from 'react';
import { Text, View, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import data from '../data.json';
import Styles from './TestListScreen.module.scss';

function TestListScreen({ route, navigation }) {
  const { level } = route.params;
  const currentLevel = level;
  const testList = data[level].ListOfTests;

  const [selectedId, setSelectedId] = useState(null);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[Styles.item, backgroundColor]}>
      <Text style={[Styles.item_title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item, index, level }) => {
    const backgroundColor = item.title === selectedId ? '#4b504e' : '#1d3521';
    const color = item.title === selectedId ? 'white' : 'wheat';

    return (
      <Item
        item={item}
        level={level}
        onPress={() => {
          setSelectedId(item.title),
            navigation.navigate('Test', { index: index, level: currentLevel });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={Styles.test_list_block}>
      <View style={Styles.test_list}>
        <Text style={Styles.test_list_title}>Choose test:</Text>
        <FlatList
          data={testList}
          style={Styles.item_block}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          extraData={selectedId}
          level={level}
        />
        <TouchableOpacity style={Styles.home_button} onPress={() => navigation.navigate('Home')}>
          <Text style={Styles.home_button_title}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default TestListScreen;
