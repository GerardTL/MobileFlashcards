import React, { Component } from 'react';
import { Animated, Button, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { receiveDecks } from '../actions';
import { FLASHCARDS_STORAGE_KEY } from '../utils/api';
import { BgColor, ButtonColor, startData, STYLES } from '../utils/helpers';

class DeckList extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  componentDidMount() {
    const { dispatch } = this.props;

    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
      .then((decks) => {
        if (decks != null) {
          decks = JSON.parse(decks);
        }
        else {
          decks = startData;
          AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
        }
        return decks;
      })
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
  }

  launchDeck = (deckKey, qLength) => {
    const { bounceValue } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start(() => {
      this.props.navigation.navigate(
        'Deck',
        { 
          key: deckKey,
          qLength: qLength
        }
      )
    });
  }

  shakeMe = () => {
    const { bounceValue } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start();
  }

  render() {
    const { navigation, decks } = this.props;
    const { bounceValue } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between', 
        alignItems: 'stretch', backgroundColor: {BgColor} }}>

        <View style={{paddingTop: 10}}>
          <Text style={STYLES.fs22}>Mobile Flashcards</Text>
        </View>

        <View style={{           
          padding: 30, 
          paddingBottom: 60 }}>

          <Animated.Text 
            style={[STYLES.fs30, {transform: [{scale: bounceValue}]}]}>
            Decks
          </Animated.Text>
          <Text style={STYLES.fs22}>Home</Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>

            <View style={{ flex: 1 }}></View>

            <View style={{ 
              flex: 2, 
              alignItems: 'stretch', 
              paddingBottom: 20
            }}>

              {Object.keys(decks).map((deckKey) => {
                const qLength = decks[deckKey].questions.length;
                return (
                  <TouchableOpacity key={deckKey}
                    onPress={() => {
                      this.launchDeck(deckKey, qLength);
                    }}>
                    <View style={STYLES.item}>
                      <Animated.Text style={[STYLES.fs22light, {transform: [{scale: bounceValue}]}]}>
                        {deckKey} ({qLength})
                      </Animated.Text>
                    </View>
                  </TouchableOpacity>
                )
              })}

              <View style={{margin: 10, marginTop: 30}}>
                <Button
                  title="New Deck"
                  color={ButtonColor}
                  onPress={() => navigation.navigate('New Deck')}
                />
              </View>

              <View style={STYLES.button}>
                <Button
                  title="Storage Utilities"
                  color={ButtonColor}
                  onPress={() => navigation.navigate('Storage Utilities')}
                />
              </View>

              <View style={STYLES.button}>
                <Button
                  title="Tickle"
                  color={ButtonColor}
                  onPress={this.shakeMe}
                />
              </View>
            </View>

            <View style={{ flex: 1 }}></View>

          </View>

        </View>

        <View style={{paddingBottom: 10}}>
          <Text style={STYLES.fs22}>React Nanodegree</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckList)