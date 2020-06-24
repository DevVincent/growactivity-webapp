import server from '../apis/server';
import { reset } from 'redux-form';
import history from '../history';
import{
    SIGN_UP,
    SIGN_IN,
    SIGN_OUT,
    FETCH_USER,
    FETCH_PROFILE,
    FETCH_SETTINGS,
    PATCH_SETTINGS,
    CREATE_ACTIVITY,
    SET_ACTIVITY,
    FETCH_ACTIVITIES,
    EDIT_ACTIVITY,
    DELETE_ACTIVITY,
    RESET_ACTIVITIES,
    CREATE_TODO,
    FETCH_TODOS,
    DELETE_TODO,
    RESET_TODOS,
    CREATE_GOAL,
    FETCH_GOALS,
    DELETE_GOAL,
    RESET_GOALS,
    CREATE_SESSION,
    FETCH_SESSIONS,
    ADD_DEADLINE,
} from './types'

export const signUp = formValues => async (dispatch) => {
    const response = await server.post('/user/signUp', { ...formValues });

    dispatch({ type: SIGN_UP, payload: response.data });
    history.push('/activities')
};

export const signIn = formValues => async (dispatch) => {
    const response = await server.post('/user/signIn', { ...formValues });
    if(response.status === 200){
        dispatch({ type: SIGN_IN, payload: response.data[0] });
        history.push('/activities')
    }
    else{
        history.push('/');
    }
};

export const signOut = () => (dispatch) => {
    dispatch({ type: SIGN_OUT, payload: ""});
};

export const fetchUser = () => async (dispatch) => {
    const response = await server.get('/user/fetchUser');
    if(response.status === 200){
        dispatch({ type: FETCH_USER, payload: response.data[0] });
        history.push('/activities');
    }else{
        history.push('/');
    }
};

export const fetchActivities = id => async (dispatch) => {
    const response = await server.post('/activity',  {id} );
    
    dispatch({ type: FETCH_ACTIVITIES, payload: response.data });
    history.push('/activities')
    
};

export const createActivity = formValues => async (dispatch) => {
    const response = await server.post('/activity/new', { ...formValues });

    dispatch({ type: CREATE_ACTIVITY, payload: response.data });
    history.push(`/activities/${response.data._id}/workspace`)
};

export const setActivity = id => (dispatch) => {

    dispatch({ type: SET_ACTIVITY, payload: id });
};

export const deleteActivity = parameters => async (dispatch) => {
    await server.delete('/activity/'+ parameters);
    
    dispatch({ type: DELETE_ACTIVITY, payload: parameters });
    history.push(`/activities`)
};

export const resetActivities = () => async (dispatch) => {
    
    dispatch({ type: RESET_ACTIVITIES, payload: "" });
};

//TODOS
export const createTodo = formValues => async (dispatch) => {
    
    const response = await server.post('/todo/new', { ...formValues });

    dispatch({ type: CREATE_TODO, payload: response.data });
    dispatch(reset('newTodoForm'));  // requires form name
};

export const fetchTodos = id => async (dispatch) => {
    const response = await server.post('/todo',  {id} );
    
    dispatch({ type: FETCH_TODOS, payload: response.data });
};

export const deleteTodo = parameters => async (dispatch) => {
    await server.delete('/todo/'+ parameters);
    
    dispatch({ type: DELETE_TODO, payload: parameters });
};

export const resetTodos = () => async (dispatch) => {
    
    dispatch({ type: RESET_TODOS, payload: "" });
};
//GOALS
export const createGoal = formValues => async (dispatch) => {
    const response = await server.post('/goal/new', { ...formValues });

    dispatch({ type: CREATE_GOAL, payload: response.data });
    dispatch(reset('newGoalForm0')); 
    dispatch(reset('newGoalForm1'));
    dispatch(reset('newGoalForm2'));
    dispatch(reset('newGoalForm3'));
    dispatch(reset('newGoalForm4'));
    dispatch(reset('newGoalForm5'));
    dispatch(reset('newGoalForm6'));
};
export const addDeadline = formValues => async (dispatch) => {
    const response = await server.post('/goal/addDeadline', { ...formValues });

    dispatch({ type: ADD_DEADLINE, payload: response.data });
    dispatch(reset('deadlineForm'));
    
};
export const fetchGoals = id => async (dispatch) => {
    const response = await server.post('/goal',  {id} );
    
    dispatch({ type: FETCH_GOALS, payload: response.data });
};

export const fetchGoalsByWeek = values => async (dispatch) => {
    const response = await server.post('/goal/goalsByWeek',  { ...values} );
    
    dispatch({ type: FETCH_GOALS, payload: response.data });
};

export const deleteGoal = parameters => async (dispatch) => {
    await server.delete('/goal/'+ parameters);
    
    dispatch({ type: DELETE_GOAL, payload: parameters });
};

export const resetGoals = () => async (dispatch) => {
    
    dispatch({ type: RESET_GOALS, payload: "" });
};