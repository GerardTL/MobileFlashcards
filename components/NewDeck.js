import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { FLASHCARDS_STORAGE_KEY } from '../utils/api';
import { alertMF, BgColor, ButtonColor, STYLES } from '../utils/helpers';
import { addDeck } from '../actions';

class NewDeck extends Component {
  state = {
    deckName: '',
    userMessage: 'Enter a deck name'
  }

  handleSubmit = () => {
    const { deckName } = this.state;
    const { decksKeys } = this.props;

    if (decksKeys.includes(deckName)) {
      alertMF('Oops! ', 'Deck ' + deckName + ' already exists, please choose another name.');
    }
    else {
      const newDeck = {
        [deckName] : {
          title: deckName,
          questions: []
        }
      };

      AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeck))
        .then(() => { this.props.dispatch(addDeck(deckName)); })
        .then(() => { 
          /*
          this.setState({deckName: '', userMessage: 'Deck ' + deckName + ' added'});
          this.deckNameRef.focus();
          */
          this.props.navigation.navigate(
            'Deck',
            { 
              key: deckName,
              qLength: 0
            }
          );
        })
    }
  }

  render() {
    const { deckName } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between', 
        alignItems: 'stretch', backgroundColor: {BgColor} }}>

        <View style={{paddingTop: 10}}>
          <Text style={STYLES.fs22}>Mobile Flashcards</Text>
        </View>

        <View style={{ padding: 30, paddingBottom: 60 }}>
          <Text style={STYLES.fs30}>Decks</Text>
          <Text style={STYLES.fs22}>New Deck</Text>

          <View style={{ marginTop: 20, 
            flexDirection: 'row',
            justifyContent: 'center' }}>

            <View style={{ flex: 1 }}></View>

            <View style={{ flex: 2 }}>
              <Text style={STYLES.fs22}>
                {this.state.userMessage}
              </Text>

              <TextInput
                style={{ 
                  height: 30, 
                  borderColor: 'gray', 
                  borderWidth: 1, 
                  marginTop: 6, 
                  marginBottom: 20,
                  paddingLeft: 8,
                  paddingRight: 8
                }}
                onChangeText={(text)=>{this.setState({ deckName: text })}}
                value={deckName} 
                ref={ref => this.deckNameRef = ref}
                autoFocus={true}
                placeholder='Deck Name' />

              <View style={{marginBottom: 20}}>
                <Button
                  title="Create Deck"
                  color={ButtonColor}
                  onPress={this.handleSubmit}
                  disabled={deckName.length===0}
                />
              </View>

              <Button
                title="Back to Decks Home"
                color={ButtonColor}
                onPress={this.props.navigation.goBack}
              />
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

function mapStateToProps(decks, { navigation }) {
  return {
    decksKeys: Object.keys(decks),
    navigation
  }
}

export default connect(mapStateToProps)(NewDeck);