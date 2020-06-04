import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import { removeDeck } from '../utils/api';
import { BgColor, ButtonColor, confirmMF, STYLES } from '../utils/helpers';

class Deck extends Component {
  confirmRemove = () => {
    confirmMF('Confirmation', 'OK to remove deck ' + this.props.deckKey +'?', 
      this.doDeleteDeck);
  }

  doDeleteDeck = () => {
    const { deckKey, dispatch, navigation } = this.props;

    removeDeck(deckKey)
    .then(() => {
      dispatch(deleteDeck(deckKey));
    })
    .then(() => {
      navigation.goBack();
    })
  }

  render() {
    const { deckKey, qLength, navigation } = this.props;

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
          <Text style={STYLES.fs22}>Options</Text>

          <View style={{ marginTop: 20, 
            flexDirection: 'row',
            justifyContent: 'center' }}>

            <View style={{ flex: 1}}></View>

            <View style={{ flex: 2, marginTop: 20, 
              flexDirection: 'column',
              justifyContent: 'center' }}>

              <View style={{margin: 10}}>
                <Button
                  title='Start Quiz'
                  color={ButtonColor}
                  disabled={qLength === 0}
                  onPress={() => navigation.navigate(
                    'Quiz',
                    {
                      key: deckKey,
                      qLength: qLength
                    }
                  )}
                />
              </View>

              <View style={{margin: 10}}>
                <Button
                  title='New Question and Answer'
                  color={ButtonColor}
                  onPress={() => navigation.navigate(
                    'New Question',
                    { key: deckKey }
                  )}
                />
              </View>

              <View style={{margin: 10}}>
                <Button
                  title='Remove Deck'
                  color={ButtonColor}
                  onPress={this.confirmRemove}
                />
              </View>

              <View style={{margin: 10}}>
                <Button
                  title='Back to Decks Home'
                  color={ButtonColor}
                  onPress={() => navigation.navigate(
                    'Home',
                    { key: deckKey }
                  )}
                />
              </View>

            </View>

            <View style={{ flex: 1}}></View>

          </View>

        </View>

        <View style={{paddingBottom: 10}}>
          <Text style={STYLES.fs22}>React Nanodegree</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps (decks, { route, navigation}) {
  const { key } = route.params;
  const qLength = decks[key] == null ? 0 : decks[key].questions.length;

  return {
    deckKey: key,
    qLength: qLength,
    navigation
  }
}

export default connect(mapStateToProps)(Deck);