import _ from 'lodash'
import { CREATE_TODO, FETCH_TODOS, DELETE_TODO, SIGN_OUT, RESET_TODOS } from '../actions/types'

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_TODOS:
            return { ...state, ..._.mapKeys(action.payload, '_id') }
        case CREATE_TODO:
            return { ...state, [action.payload._id]: action.payload}
        case DELETE_TODO:
            return _.omit(state, action.payload)
        case RESET_TODOS:
            return INITIAL_STATE
        case SIGN_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}