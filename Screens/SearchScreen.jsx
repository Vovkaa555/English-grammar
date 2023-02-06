import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import * as Animatable from 'react-native-animatable';
import Styles from './SearchScreen.module.scss';
import data from '../data.json';

function SearchScreen({ navigation }) {
  const [text, onChangeText] = useState('');
  const listOfTestsData = data.map((data) => data.ListOfTests);
  const testsData = listOfTestsData.flat().map((data) => data.Tests);

  let res = testsData
    .flat()
    .filter((data) => (data.tags.includes(text.toLowerCase()) && text.length > 1 ? data : ''));

  const result = res.map((data, index) => `${index + 1}. ${data.rule}`);

  const Item = ({ item }) => (
    <View style={Styles.rules_block}>
      <Text style={Styles.text_search}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={Styles.search_screen}>
      <View style={Styles.search_block}>
        <View style={Styles.search}>
          <View style={Styles.search_field}>
            <TextInput
              style={Styles.search_input}
              onChangeText={(value) => onChangeText(value)}
              placeholder="Enter key word:"
              placeholderTextColor="grey"
              cursorColor="wheat"
              autoFocus={true}
              maxLength={25}
              value={text}
            />
            {text && (
              <Animatable.View style={Styles.clear_input_block} animation={'rotate'}>
                <TouchableOpacity onPress={() => onChangeText('')}>
                  <Text style={Styles.clear_input_text}>+</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
          {result.length > 0 && text.length > 1 ? (
            <FlatList
              style={Styles.rules_list}
              data={result}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Item item={item} />}
            />
          ) : (
            <View style={Styles.not_found_block}>
              <Text style={Styles.not_found_text}>Not found</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={Styles.home_button} onPress={() => navigation.navigate('Home')}>
          <Text style={Styles.home_button_title}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
