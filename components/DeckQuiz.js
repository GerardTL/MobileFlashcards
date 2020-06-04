import React, { Component, Fragment } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { BgColor, ButtonColor, clearLocalNotification, 
  setLocalNotification, STYLES } from '../utils/helpers';

class DeckQuiz extends Component {
  state = {
    iQuestion: 0,
    answerVisible: false,
    nCorrect: 0,
    nIncorrect: 0
  }

  resetState = () => {
    /* repeat quiz */
    this.setState( {
      iQuestion: 0,
      answerVisible: false,
      nCorrect: 0,
      nIncorrect: 0
    } );
  }

  showAnswer = () => {
    this.setState({ answerVisible: true});
  }

  tallyCorrect = () => {
    this.setState((old) => ({
      iQuestion: old.iQuestion + 1,
      answerVisible: false,
      nCorrect: old.nCorrect + 1
    }));
  }

  tallyIncorrect = () => {
    this.setState((old) => ({
      iQuestion: old.iQuestion + 1,
      answerVisible: false,
      nIncorrect: old.nIncorrect + 1
    }));
  }

  exitQuiz = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { deckKey, questions, qLength } = this.props;
    const { iQuestion, answerVisible, nCorrect, nIncorrect } = this.state;

    if (iQuestion > qLength) {
      /* quiz complete: clear today's reminder, set tomorrow's */
      clearLocalNotification()
        .then(setLocalNotification);
    }

    return (
      <View style={{ flex: 1, justifyContent: 'space-between', 
        alignItems: 'stretch', backgroundColor: {BgColor} }}>

        <View style={{paddingTop: 10}}>
          <Text style={STYLES.fs22}>Mobile Flashcards</Text>
        </View>

        <View style={{ padding: 30, paddingBottom: 60 }}>
          <Text style={STYLES.fs30}>Deck: {deckKey} ({qLength})</Text>
          <Text style={STYLES.fs22}>Quiz</Text>

          <View style={{ alignItems: 'center' }}>
            <Text style={STYLES.fs22Heading}>
              {iQuestion < qLength ? 
                'Question ' + (iQuestion + 1) + ', remaining ' + (qLength - iQuestion - 1) :
                'Answered Correctly'
              }
            </Text>
            <Text style={STYLES.fs40}>
              {iQuestion < qLength ?
                questions[iQuestion].question :
                nCorrect.toString() + ' of ' + qLength + ' (' + (100 * nCorrect/qLength).toFixed(0) + '%)'
              }
            </Text>

            <Text style={STYLES.fs22Heading}>
              {iQuestion < qLength ?
                'Answer' :
                'Answered Incorrectly'
              }
            </Text>
            <Text style={STYLES.fs40}>
              {iQuestion < qLength && !answerVisible && ' '}
              {iQuestion < qLength && answerVisible && questions[iQuestion].answer}
              {iQuestion >= qLength && nIncorrect.toString() + 
                ' of ' + qLength + ' (' + (100 * nIncorrect/qLength).toFixed(0) + '%)'}
            </Text>
          </View>

          <View style={{ marginTop: 50, 
            flexDirection: 'row',
            justifyContent: 'center' }}>

            {iQuestion < qLength && !answerVisible &&
            (
              <Fragment>
                <View style={{ flex: 1, margin: 10 }}></View>

                <View style={{ flex: 2, margin: 10 }}>
                  <Button title='Show Answer' 
                    color={ButtonColor}
                    onPress={this.showAnswer} 
                  />
                </View>

                <View style={{ flex: 1, margin: 10 }}></View>
              </Fragment>
            )}

            {iQuestion < qLength && answerVisible &&
            (
              <Fragment>
                <View style={{ flex: 1, margin: 10 }}></View>
                <View style={{ flex: 2, margin: 10 }}>
                  <Button title='Correct' 
                    color={'#00BB00'}
                    onPress={this.tallyCorrect} 
                  />
                </View>
                <View style={{ flex: 2, margin: 10 }}>
                  <Button title='Incorrect' 
                    color={'#BB0000'}
                    onPress={this.tallyIncorrect} 
                  />
                </View>
                <View style={{ flex: 1, margin: 10 }}></View>
              </Fragment>  
            )}

            {iQuestion >= qLength &&
            (
              <Fragment>
                <View style={{ flex: 1, margin: 10 }}></View>
                <View style={{ flex: 2, margin: 10 }}>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button title='Restart Quiz' 
                      color={ButtonColor}
                      onPress={this.resetState} 
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button title='Back to Deck' 
                      color={ButtonColor}
                      onPress={this.exitQuiz} 
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button title='Back to Decks Home' 
                      color={ButtonColor}
                      onPress={() => this.props.navigation.navigate(
                        'Home',
                        { key: deckKey }
                      )}  
                    />
                  </View>
                </View>
                <View style={{ flex: 1, margin: 10 }}></View>
              </Fragment>
            )}
          </View>
        </View>

        <View style={{paddingBottom: 10}}>
          <Text style={STYLES.fs22}>React Nanodegree</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks, { route, navigation }) {
  const { key } = route.params;
  return { 
    deckKey: key,
    questions: decks[key].questions,
    qLength: route.params.qLength,
    navigation: navigation
  };
}

export default connect(mapStateToProps)(DeckQuiz)