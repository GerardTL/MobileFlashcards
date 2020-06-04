import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { FLASHCARDS_STORAGE_KEY } from '../utils/api';
import { alertMF, BgColor, ButtonColor, STYLES } from '../utils/helpers';
import { addQuestion } from '../actions';

class DeckNewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { decks, deckKey } = this.props;

    const newQuestions = [ ...decks[deckKey].questions, {
      question: question,
      answer: answer
    } ];

    const revDeck = {
      [deckKey] : {
        title: deckKey,
        questions: newQuestions
      }
    };

    /*
    try {
      const jsonValue = JSON.stringify(revDeck)
      await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, jsonValue)
      dispatch(addQuestion(deckKey, question, answer));
      console.log('DeckNewQuestion: added question and answer');
    } 
    catch(e) {
      console.log('DeckNewQuestion: error adding question and answer');     
    }
    */
    const jsonValue = JSON.stringify(revDeck);
    
    AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, jsonValue)
    .then(() => {
      let action = this.props.dispatch(addQuestion(deckKey, question, answer));
    })
    .then(() => {
      alertMF('Question and Answer added: \n', question + '\n' + answer);
      this.setState({ question: '', answer: '' });
      this.question.focus();
    });    
  }

  render() {
    const { question, answer } = this.state;
    const { deckKey, qLength } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between', 
        alignItems: 'stretch', backgroundColor: {BgColor} }}>

        <View style={{paddingTop: 10}}>
          <Text style={STYLES.fs22}>Mobile Flashcards</Text>
        </View>

        <View style={{ 
          padding: 30, 
          paddingBottom: 60 
        }}>

          <Text style={STYLES.fs30}>Deck: {deckKey} ({qLength})</Text>
          <Text style={STYLES.fs22}>New Question and Answer</Text>

          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{flex: 1}}></View>

            <View style={{flex: 2}}>
              <TextInput
                style={{ 
                  height: 30, 
                  borderColor: 'gray', 
                  borderWidth: 1, 
                  marginTop: 20, 
                  marginBottom: 0,
                  paddingLeft: 8,
                  paddingRight: 8
                }}
                onChangeText={(text)=>{this.setState({ question: text })}}
                value={question} 
                placeholder='question'
                ref={ref => this.question = ref}
                autoFocus />
  
              <TextInput
                style={{ 
                  height: 30, 
                  borderColor: 'gray', 
                  borderWidth: 1, 
                  marginTop: 10, 
                  marginBottom: 20,
                  paddingLeft: 8,
                  paddingRight: 8
                }}
                onChangeText={(text)=>{this.setState({ answer: text })}}
                value={answer} 
                placeholder='answer' />
  
              <View style={{marginBottom: 20}}>
                <Button
                  title='Submit'
                  color={ButtonColor}
                  onPress={this.handleSubmit}
                  disabled={
                    question.length===0 || answer.length===0
                  }
                />
              </View>

              <Button
                title='Back to Deck'
                color={ButtonColor}
                onPress={this.props.navigation.goBack}
              />
            </View>

            <View style={{flex: 1}}></View>
          </View>

        </View>

        <View style={{paddingBottom: 10}}>
          <Text style={STYLES.fs22}>React Nanodegree</Text>
        </View>
      </View>
    ); 
  }
}

function mapStateToProps(decks, {route, navigation}) {
  const { key } = route.params;
  return { 
    decks,
    deckKey: key,
    qLength: decks[key].questions.length,
    navigation
  };
}

export default connect(mapStateToProps)(DeckNewQuestion)