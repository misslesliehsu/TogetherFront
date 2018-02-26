// import { combineReducers } from 'redux'

// const rootReducer = combineReducers({
//   ideas: ideasReducer,
//   other: anotherideasReducer
// })

const ideasReducer = (state = {ideas: [{name:"testname", location:"testlocation"}], events: [], friends: [{first_name:"sam"}, {first_name:"joe"}], user_id:22}, action) => {
  switch (action.type) {
    case "ADD_IDEA":
      return {...state, ideasWithDates: [...state.ideas, action.ideaWithDates]}
    default: return state
  }
}
// const anotherideasReducer = (state = {ideas: ["1", "2"], events: [], friends: []}, action) => {
//   return state
// }


export default ideasReducer
