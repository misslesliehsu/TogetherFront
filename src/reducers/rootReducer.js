// import { combineReducers } from 'redux'

// const rootReducer = combineReducers({
//   ideas: ideasReducer,
//   other: anotherideasReducer
// })

const ideasReducer = (state = {ideas: [{name:"testname", location:"testlocation"}], events: [], friends: []}, action) => {
  switch (action.type) {
    case "ADD_IDEA":
      return {ideas: [...state.ideas, action.idea]}
    default: return state
  }
}
// const anotherideasReducer = (state = {ideas: ["1", "2"], events: [], friends: []}, action) => {
//   return state
// }


export default ideasReducer
