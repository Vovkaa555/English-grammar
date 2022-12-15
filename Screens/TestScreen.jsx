import { Text, View, TouchableOpacity, FlatList, Button, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

import * as Animatable from 'react-native-animatable';

import Styles from './TestScreen.module.scss';
import data from '../data.json';

function TestScreen({ route, navigation }) {
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [switcher, setSwitcher] = useState(false);
  const [showAnswer, setShowAnswer] = useState('#1d3521');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const { level, index } = route.params;
  const question = data[level].ListOfTests[index].Tests[step];
  const testLength = data[level].ListOfTests[index].Tests.length;

  const onPressVariant = (index) => {
    if (index == question.correct) {
      setCorrect(correct + 1);
    }
    setSwitcher(true);
    index == question.correct ? setShowAnswer('green') : setShowAnswer('red');
    index != question.correct ? setCorrectAnswer('green') : setCorrectAnswer('');
  };
  const onPressTryAgain = () => {
    setStep(0);
    setCorrect(0);
  };

  const onPressNext = () => {
    setStep(step + 1);
    setSwitcher(false);
    setSelectedAnswer(null);
    setShowAnswer('#1d3521');
    setCorrectAnswer('');
  };

  function Result({ onPressTryAgain, correct, testLength }) {
    return (
      <View style={Styles.result}>
        <Text style={Styles.result_title}>
          {correct} correct answers from {testLength} questions.
        </Text>
        <TouchableOpacity style={Styles.try_again_button} onPress={onPressTryAgain}>
          <Text style={Styles.try_again_title}>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.home_button}
          onPress={() => navigation.navigate('TestList', { level: level })}>
          <Text style={Styles.home_button_title}>Back to tests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.home_button} onPress={() => navigation.navigate('Home')}>
          <Text style={Styles.home_button_title}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function Test({ onPressVariant, onPressNext, step, switcher, correctAnswer, showAnswer }) {
    const percentage = Math.round((step / testLength) * 100);

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
        disabled={switcher}
        onPress={onPress}
        style={[Styles.item_block, backgroundColor]}>
        {item === question.variants[question.correct] ? (
          <View style={[Styles.correct_answer_block, { backgroundColor: `${correctAnswer}` }]}>
            <Text style={[Styles.answer_text, textColor]}>{item}</Text>
          </View>
        ) : (
          <View style={[Styles.correct_answer_block, { backgroundColor: `` }]}>
            <Text style={[Styles.answer_text, textColor]}>{item}</Text>
          </View>
        )}
      </TouchableOpacity>
    );

    const renderItem = ({ item, index }) => {
      const color = item === selectedAnswer ? 'white' : 'wheat';
      const backgroundColor = item === selectedAnswer ? `${showAnswer}` : '#1d3521';

      return (
        <Item
          item={item}
          onPress={() => {
            setSelectedAnswer(item), onPressVariant(index);
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };

    return (
      <View style={Styles.test}>
        <View style={Styles.progress_bar}>
          <Animatable.View
            animation={'rubberBand'}
            easing="ease-in-out"
            style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: '#0bf341',
            }}></Animatable.View>
        </View>
        <View style={Styles.question_block}>
          <Text style={Styles.question_title}>{question.title}</Text>
        </View>
        {switcher ? (
          <Animatable.View style={Styles.rule_block} animation={'fadeInDown'} easing="ease-in-out">
            <Text style={Styles.rule_title}>{question.rule}</Text>
          </Animatable.View>
        ) : (
          ''
        )}
        <FlatList
          data={question.variants}
          style={Styles.answer_block}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          extraData={selectedAnswer}
        />
        {switcher ? (
          <TouchableOpacity style={Styles.next_button} onPress={onPressNext}>
            <Animatable.Text
              style={Styles.next_button_title}
              animation={'flipInY'}
              easing="ease-in-out">
              Next
            </Animatable.Text>
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={Styles.test_block}>
      {step !== testLength ? (
        <Test
          step={step}
          switcher={switcher}
          onPressVariant={onPressVariant}
          onPressNext={onPressNext}
          showAnswer={showAnswer}
          correctAnswer={correctAnswer}
        />
      ) : (
        <Result onPressTryAgain={onPressTryAgain} correct={correct} testLength={testLength} />
      )}
    </SafeAreaView>
  );
}

export default TestScreen;
