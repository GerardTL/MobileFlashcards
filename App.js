import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { ButtonColor, FontColorLight, setLocalNotification } from './utils/helpers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import DeckQuiz from './components/DeckQuiz';
import DeckNewQuestion from './components/DeckNewQuestion';
import NewDeck from './components/NewDeck';
import StorageUtilities from './components/StorageUtilities';

function MainNavigator() {
  const Stack = createStackNavigator();

  return(
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: ButtonColor,
        },
        headerTintColor: FontColorLight,
        headerTitleStyle: {
          fontWeight: 'normal',
        },
      }}>
        <Stack.Screen name='Home' component={DeckList} />
        <Stack.Screen name='New Deck' component={NewDeck} />
        <Stack.Screen name='Deck' component={Deck} />
        <Stack.Screen name='Quiz' component={DeckQuiz} />
        <Stack.Screen name='New Question' component={DeckNewQuestion} />
        <Stack.Screen name='Storage Utilities' component={StorageUtilities} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
