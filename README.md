# Documentation of Mobile Flashcards Project
**Gerard T. Lum**
June 3, 2020

This is documentation of my required project in the Udacity React Nanodegree Program, titled **Mobile Flashcards.**

The project specification, or rubric, resides here:
https://review.udacity.com/#!/rubrics/1021/view

The task is to take the above rubric and produce a fully functioning Mobile Flashcards app using React Native.  I used Expo for development.

The finished project resides in this repository:
https://github.com/GerardTL/MobileFlashcards

To run the project, fork and clone the repository, then issue the following commands:
```
yarn install
yarn start
```

## Features of Mobile Flashcards App
Mobile Flashcards is an app version of traditional flashcards.  A flashcard contains a question on one side, and a corresponding answer on the other.  The user reads the question, formulates an answer in his/her mind, then flips the card over to see the answer.  Practicing with flashcards can help a person learn a subject, like a child memorizing multiplication tables.  Flashcards can be created for most any subject.

With Mobile Flashcards, the user can:
- create decks of flashcards--a deck can be dedicated to any subject
- within each deck, create any number of question-answer pairs
- run a quiz: the app displays each question (without the answer), the user formulates an answer in his/her mind, then when the user presses "Show Answer," the app displays the answer.  When all questions have been shown, the app displays the number of questions answered correctly and incorrectly, along with percentages.

## Target Platform
The app was developed for an Android tablet (Lenovo Tab 4, 8").

## React Components
App.js resides in the main directory.  Source code also resides in the following subdirectories: actions, components, reducers, and utils.

The main program logic is implemented in the components directory, which contains the following:
```
DeckList.js
- Deck.js
  - DeckQuiz.js
  - DeckNewQuestion.js
- NewDeck.js
- StorageUtilities.js
```
