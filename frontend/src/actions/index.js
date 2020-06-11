import server from '../apis/server';
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
    FETCH_ACTIVITY,
    FETCH_ACTIVITIES,
    EDIT_ACTIVITY,
    DELETE_ACTIVITY,
    CREATE_TODO,
    FETCH_TODOS,
    CREATE_GOAL,
    FETCH_GOALS,
    CREATE_SESSION,
    FETCH_SESSIONS,
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

export const deleteActivity = parameters => async (dispatch) => {
    await server.delete('/activity/'+ parameters);
    
    dispatch({ type: DELETE_ACTIVITY, payload: parameters });
    history.push(`/activities`)
};