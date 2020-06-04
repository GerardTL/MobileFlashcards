import { Alert, Platform, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const FLASHCARDS_NOTIFICATION_KEY = 'FLASHCARDS_NOTIFICATION_KEY';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Mobile Flashcards Reminder',
    body: "👋 Stay sharp by taking a daily quiz!",
    ios: {
      sound: true
    },
    android: {
      sticky: false
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            /* console.log('setLocalNotification: status = ' + status); */
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
              /* console.log('cancelAllScheduledNotificationsAsync called'); */

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )
              /* console.log('scheduleLocalNotificationAsync called'); */

              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    });
}

export function alertMF (alertTitle, alertMsg) {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Alert.alert(
      alertTitle,
      alertMsg,
      [
        { text: 'OK' }
      ],
      { cancelable: true }
    );
  }
  else { /* web and others, use alert */
    alert(alertTitle + alertMsg);
  }
}

export function confirmMF (alertTitle, alertMsg, okFunction) {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Alert.alert(
      alertTitle,
      alertMsg,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: okFunction }
      ],
      { cancelable: true }
    );
  }
  else { /* web and others, use confirm */
    if (confirm(alertTitle + ': ' + alertMsg)) {
      okFunction();
    }
  }
}

export const startData =
{
  "JavaScript": {
    "title": "JavaScript",
    "questions": [
      {
          "question": "What is the difference between null and undefined?",
          "answer": "undefined is the value automatically assigned to a variable which has been declared but not assigned a value.  null is a value assigned to a variable, representing no value."
      }
    ]
  }
};

/* color scheme */
export const BgColor = '#f1f0ff';
export const ButtonColor = '#8c489f';
export const FontColorDark = '#443266';
export const FontColorLight = '#f1f0ff';

export const STYLES = StyleSheet.create({
  button: {
    margin: 10
  },
  item: {
    backgroundColor: ButtonColor,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  fs20: {
    fontFamily: 'serif',
    fontSize: 20,
    color: FontColorDark,
    textAlign: 'center'
  },
  fs22: {
    fontFamily: 'serif',
    fontSize: 22,
    color: FontColorDark,
    textAlign: 'center'
  },
  fs22light: {
    fontFamily: 'serif',
    fontSize: 22,
    color: FontColorLight,
    textAlign: 'center'
  },
  fs22Heading: {
    fontFamily: 'serif',
    fontSize: 22,
    color: FontColorDark,
    marginTop: 30,
    textAlign: 'center'
  },
  fs30: {
    fontFamily: 'serif',
    fontSize: 30,
    color: FontColorDark,
    textAlign: 'center'
  },
  fs40: {
    fontFamily: 'serif',
    fontSize: 40,
    color: FontColorDark,
    textAlign: 'center'
  }
})