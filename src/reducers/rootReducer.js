// import { combineReducers } from 'redux'

// const rootReducer = combineReducers({
//   ideas: ideasReducer,
//   other: anotherideasReducer
// })

const ideasReducer = (state = {ideas: [], events: [], friends: [], user:{id:22, first_name: "test", last_name: "", email: ""}, action) => {
  switch (action.type) {
    case "ADD_IDEA":
      return {...state, ideas: [...state.ideas, action.idea]}
    case "ADD_FRIEND":
      return {...state, friends: [...state.friends, action.friend]}
    case "ADD_VOTE":
      //find the idea in question - using the action i_id
      //find the date suggestion in question - using the action ds_id
      //add to user to the datesuggestion.voters, based on user info
      updatedIdeas = this.state.ideas.map( i =>
        if (i.id == action.i_id) {
          i.date_suggestions.map( ds => {
            if (ds.id == action.ds_id) {
              
            }
          })
        }
        else {
          i
        }
      )
      const ideaIndex = this.state.ideas.findIndex(i => i.id == action.i_id)
      const dS = this.state.ideas[ideaIndex].date_suggestions.find(x => x.id == action.ds_id)


    case "REMOVE_VOTE":
      return {...state, friends: [...state.friends, action.friend]}
    default: return state
  }
}
// const anotherideasReducer = (state = {ideas: ["1", "2"], events: [], friends: []}, action) => {
//   return state
// }


export default ideasReducer
