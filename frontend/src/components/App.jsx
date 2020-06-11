import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

//Activities imports
import ListActivities from './activities/ListActivities';
import CreateActivity from './activities/CreateActivity';
import EditActivity from './activities/EditActivity';
import DeleteActivity from './activities/DeleteActivity';
//Workspace imports
import Workspace from './workspace/Workspace'
import Chart from './workspace/Chart';
import Goals from './workspace/Goals';
import Session from './workspace/Session';
import Todos from './workspace/Todos';
import UtilityLinks from './workspace/UtilityLinks';
//Public components imports
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import About from './About';
import Contact from './Contact';
//User imports
import Profile from './user/Profile';
import Settings from './user/Settings';


const App = () => {
    return(
        <div>
            <Router history={history}>
                <div>
                    <Route 
                        path='/' exact 
                        component={Home}
                    />
                    <Route 
                        path='/signIn' exact 
                        component={SignIn}
                    />
                    <Route 
                        path='/signUp' exact 
                        component={SignUp}
                    />
                    <Route 
                        path='/about' exact 
                        component={About}
                    />
                    <Route 
                        path='/contact' exact 
                        component={Contact}
                    />
                    <Route 
                        path='/:id/profile' exact 
                        component={Profile}
                    />
                    <Route 
                        path='/:id/settings' exact 
                        component={Settings}
                    />
                    <Route 
                        path='/activities' exact 
                        component={ListActivities}
                    />
                    <Route 
                        path='/activities/createActivity' exact 
                        component={CreateActivity}
                    />
                    <Route 
                        path='/activities/editActivity' exact 
                        component={EditActivity}
                    />
                    <Route 
                        path='/activities/:id/deleteActivity' exact 
                        component={DeleteActivity}
                    />
                    <Route 
                        path='/activities/:id/workspace' exact 
                        component={Workspace}
                    />
                    <Route 
                        path='/activities/:id/workspace/chart' exact 
                        component={Chart}
                    />
                    <Route 
                        path='/activities/:id/workspace/goals' exact 
                        component={Goals}
                    />
                    <Route 
                        path='/activities/:id/workspace/session' exact 
                        component={Session}
                    />
                    <Route 
                        path='/activities/:id/workspace/todos' exact 
                        component={Todos}
                    />                   
                    <Route 
                        path='/activities/:id/workspace/utilityLinks' exact 
                        component={UtilityLinks}
                    />
                </div>
            </Router>
        </div>
    )
}

export default App;