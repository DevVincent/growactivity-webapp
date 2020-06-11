import _ from 'lodash'
import { CREATE_ACTIVITY, FETCH_ACTIVITIES, DELETE_ACTIVITY, SIGN_OUT } from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_ACTIVITIES:
            return { ...state, ..._.mapKeys(action.payload, '_id') }
        case CREATE_ACTIVITY:
            return { ...state, [action.payload._id]: action.payload}
        case DELETE_ACTIVITY:
            return _.omit(state, action.payload)
        case SIGN_OUT:
            return { }
        default:
            return state;
    }
}