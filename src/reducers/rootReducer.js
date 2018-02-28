// import { combineReducers } from 'redux'

// const rootReducer = combineReducers({
//   ideas: ideasReducer,
//   other: anotherideasReducer
// })




const ideasReducer = (state = {ideas: [], events: [], friends: [], user:{id:31, first_name: "hardwired first name", last_name: 'hardwired last name', email: "hardwired email"}}, action) => {
  switch (action.type) {
    case "ADD_IDEA":
      return {...state, ideas: [...state.ideas, action.idea]}
    case "ADD_FRIEND":
      return {...state, friends: [...state.friends, action.friend]}
    case "ADD_VOTE":
      var updatedIdeas = state.ideas.map( i => {
        if (i.id == action.i_id) {
          return {...i, date_suggestions:
            i.date_suggestions.map( ds => {
              if (ds.id == action.ds_id) {
                return {...ds, voters: [...ds.voters, state.user]}
              }
              else {
                return ds
              }
            })
          }
        }
        else {
          return i
        }
      }
      )
      return {...state, ideas: updatedIdeas}
    case "REMOVE_VOTE":
      var updatedIdeas = state.ideas.map( i => {
        if (i.id == action.i_id) {
          return {...i,date_suggestions:
            i.date_suggestions.map( ds => {
              if (ds.id == action.ds_id) {
                const i = ds.voters.findIndex(v => v.id == state.user.id)
                let updatedVoters = ds.voters
                updatedVoters.splice(i, 1)
                return {...ds, voters: [updatedVoters]}
              }
              else {
                return ds
              }
            })
          }
        }
        else {
          return i
        }
      }
      )
      return {...state, ideas: updatedIdeas}
    default: return state
  }
}
// const anotherideasReducer = (state = {ideas: ["1", "2"], events: [], friends: []}, action) => {
//   return state
// }


export default ideasReducer
