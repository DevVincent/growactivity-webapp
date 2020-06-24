import _ from 'lodash'
import { ADD_DEADLINE, FETCH_DEADLINES, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_DEADLINES:
            return { ..._.mapKeys(action.payload, '_id') }
        case ADD_DEADLINE:
            return { ...state, [action.payload._id]: action.payload}
        case SIGN_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}