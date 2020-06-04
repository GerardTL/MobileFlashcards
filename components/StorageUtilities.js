import React, { Component, Fragment } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FLASHCARDS_STORAGE_KEY } from '../utils/api';
import { BgColor, ButtonColor, confirmMF, FLASHCARDS_NOTIFICATION_KEY, STYLES } from '../utils/helpers';

class StorageUtilities extends Component {
  state = {
    retrievedData: ''
  }

  getStorage = async () => {
    try {
      const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
      this.setState({
        retrievedData: decks != null ? 
          JSON.stringify(JSON.parse(decks), null, 4) : 'null' 
      });
    } catch(e) {
      console.log('StorageUtilities, getStorage error: name = ' + e.name +
        ', message = ' + e.message);
    }
  }
  
  getNotification = async () => {
    try {
      const data = await AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY);
      this.setState({ retrievedData: data != null ? data : 'null' });
    } catch(e) {
      console.log('StorageUtilities, getNotification error: name = ' + e.name +
        ', message = ' + e.message);
    }
  }
  
  confirmRmvMainStorage = () => {
    confirmMF('Confirmation', 'OK to remove main decks data, async storage?', 
    this.removeMainStorage);
  }

  removeMainStorage = async () => {
    try {
      await AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
      console.log('StorageUtilities, removeMainStorage: success');
    } catch(e) {
      console.log('StorageUtilities, removeMainStorage error: name = ' + e.name +
        ', message = ' + e.message);
    }
  }

  confirmRmvNotificationStorage = () => {
    confirmMF('Confirmation', 'OK to remove notification data, async storage?', 
      this.removeNotificationStorage);
  }

  removeNotificationStorage = async () => {
    try {
      await AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
      console.log('StorageUtilities, removeNotificationStorage: success');
    } catch(e) {
      console.log('StorageUtilities, removeNotificationStorage error: name = ' + e.name +
        ', message = ' + e.message);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' , 
        alignItems: 'stretch', backgroundColor: {BgColor} }}>

        <View style={{flex: 1, paddingTop: 10}}>
          <Text style={STYLES.fs22}>Mobile Flashcards on {Platform.OS}</Text>
        </View>

        <View style={{flex: 7, justifyContent: 'flex-end'}}>
          
            <View style={{ flex: 4}}>
              <Text style={STYLES.fs30}>Decks</Text>
              <Text style={STYLES.fs22}>Storage Utilities</Text>
    
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}></View>
      
                <View style={{flex: 8}}>
                  <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'center',
                    marginTop: 20
                  }}>
                    <View style={{flex: 1, margin: 10}}>
                      <Button
                        title="View Main Decks Data, Async"
                        color={ButtonColor}
                        onPress={this.getStorage}
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                    <View style={{flex: 1, margin: 10}}>
                      <Button
                        title="Remove Main Decks Data, Async"
                        color={ButtonColor}
                        onPress={this.confirmRmvMainStorage}
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                  </View>
          
                  <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'center'
                  }}>
                    <View style={{flex: 1, margin: 10}}>
                      <Button
                        title="View Notification Data, Async"
                        color={ButtonColor}
                        onPress={this.getNotification}
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                    <View style={{flex: 1, margin: 10}}>
                      <Button
                        title="Remove Notification Data, Async"
                        color={ButtonColor}
                        onPress={this.confirmRmvNotificationStorage}
                        style={{ marginBottom: 10 }}
                      />
                    </View>
                  </View>
                </View>
      
                <View style={{flex: 1}}></View>
              </View>
            </View>

            <View style={{
              flex: 7,
              paddingLeft: 40,
              paddingRight: 40
            }}>
              <Fragment>
                <Text style={[STYLES.fs22, {marginBottom: 12}]}>Retrieved Data</Text>
                <ScrollView endfillcolor='#ff9999' style={{backgroundColor: '#e0e0e0'}}>
                  <Text>{this.state.retrievedData}</Text>
                </ScrollView>

                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}></View>
                  <View style={{flex: 1, marginTop: 12}}>
                    <Button
                      title='Back to Decks Home'
                      color={ButtonColor}
                      onPress={this.props.navigation.goBack}
                    />
                  </View>
                  <View style={{flex: 1}}></View>
                </View>

              </Fragment>
            </View>
  
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
          <Text style={STYLES.fs22}>React Nanodegree</Text>
        </View>
      </View>
    )
  }
}

export default StorageUtilities;