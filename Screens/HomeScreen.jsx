import React, { useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import Styles from './HomeScreen.module.scss';
import * as Animatable from 'react-native-animatable';
import data from '../data.json';
import { homeImage } from '../assets';

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
      <Animatable.View style={Styles.home} animation={'zoomIn'} easing="ease-in-out" duration={200}>
        <View style={Styles.level_block}>
          <Text style={Styles.home_title}>Choose level:</Text>
          <FlatList
            style={Styles.item_block}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item + index}
            extraData={selectedId}
          />
        </View>
        <Animatable.View
          style={Styles.search_button_block}
          animation={'pulse'}
          duration={2000}
          iterationCount="infinite">
          <TouchableOpacity
            style={Styles.search_button}
            onPress={() => navigation.navigate('Search')}>
            <Text style={Styles.search_button_title}>Search by rules:</Text>
            <Image source={homeImage} style={Styles.background_image} />
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </SafeAreaView>
  );
}

export default HomeScreen;
