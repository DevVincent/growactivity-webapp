import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import activityReducer from './activityReducer';

export default combineReducers({
    form: formReducer,
    user: authReducer,
    activity: activityReducer
});