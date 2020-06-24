import _ from 'lodash'
import { CREATE_ACTIVITY, FETCH_ACTIVITIES, DELETE_ACTIVITY, RESET_ACTIVITIES, SET_ACTIVITY, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
    activities: { },
    activitiesAreEmpty: true,
    currentActivity: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_ACTIVITIES:
            return { ...state, activities: _.mapKeys(action.payload, '_id'), activitiesAreEmpty: false }
        case CREATE_ACTIVITY:
            return { ...state, [action.payload._id]: action.payload}
        case DELETE_ACTIVITY:
            return _.omit(state, action.payload)
        case RESET_ACTIVITIES:
            return INITIAL_STATE
        case SET_ACTIVITY:
            return { ...state, currentActivity: action.payload }
        case SIGN_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}