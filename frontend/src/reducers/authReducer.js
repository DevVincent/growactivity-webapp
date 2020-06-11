import { SIGN_UP, SIGN_IN, SIGN_OUT, FETCH_USER } from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: null,
    userInfo: {
        _id:''
    }
    // /5edd8cdce56c9c1d98ee89b5
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_UP:
            return { ...state, isSignedIn: true, userInfo: action.payload }
        case SIGN_IN:
            return { ...state, isSignedIn: true, userInfo: action.payload }
        case FETCH_USER:
            return { ...state, isSignedIn: true, userInfo: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: null, userInfo: {_id:'null'}, }
        default:
            return state;
    }
}