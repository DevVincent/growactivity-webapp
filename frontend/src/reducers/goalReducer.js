import _ from 'lodash'
import { CREATE_GOAL, FETCH_GOALS, DELETE_GOAL, SIGN_OUT, RESET_GOALS } from '../actions/types'

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_GOALS:
            return { ..._.mapKeys(action.payload, '_id') }
        case CREATE_GOAL:
            return { ...state, [action.payload._id]: action.payload}
        case DELETE_GOAL:
            return _.omit(state, action.payload)
        case RESET_GOALS:
            return INITIAL_STATE
        case SIGN_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}