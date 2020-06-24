import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import activityReducer from './activityReducer';
import todoReducer from './todoReducer';
import goalReducer from './goalReducer';
import deadlineReducer from './deadlineReducer';

export default combineReducers({
    form: formReducer,    
    user: authReducer,
    activity: activityReducer,
    todo: todoReducer,
    goal: goalReducer,
    deadline: deadlineReducer
});
