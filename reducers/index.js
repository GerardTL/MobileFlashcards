import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION, DELETE_DECK } from '../actions'

function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK :
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };

    case ADD_QUESTION :
      const newQuestions = [ ...state[action.title].questions, {
        question: action.question,
        answer: action.answer
      } ];

      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: newQuestions
        }
      };

    case DELETE_DECK :
      const { [action.title]: deck, ...withoutDeck } = state;
      return withoutDeck;

    default:
      return state;
  }
}

export default decks;