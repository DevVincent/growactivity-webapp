import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../actions';
import { connect } from 'react-redux';
import styled from 'styled-components'

const WNavbar = styled.nav`
    padding:1.5vh 1.5vh;
    position:sticky; 
    z-index:0
    position: -webkit-sticky;
    top: 0;
`;

const WNavigation = (props) => {
    return(
        <WNavbar className="navbar navbar-dark navbar-expand-lg"> 
            <Link to={`/activities/${props.currentActivity}/workspace`} className="navbar-brand">
                Workspace
            </Link>  
            
            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">  
                <ul className="navbar-nav ml-auto">
                    
                    {props.isSignedIn ? null :<li className="nav-item">
                        <Link to='/signIn' className="nav-link">
                            SignIn
                        </Link>
                    </li>}
                    {props.isSignedIn ? null : <li className="nav-item">
                        <Link to='/signUp' className="nav-link">
                            SignUp
                        </Link>                    
                    </li>}                    
                    {props.isSignedIn ? <li className="nav-item">
                        <Link to={`/activities`} className="nav-link">
                            Activities
                        </Link> 
                    </li>: null}
                    {props.isSignedIn ? <li className="nav-item">
                        <Link to='/activities' className="nav-link">
                            Links
                        </Link>                    
                    </li> : null}
                    {props.isSignedIn ? <li className="nav-item" onClick={()=>props.signOut()}>
                        <Link to='/' className="nav-link">
                            SignOut
                        </Link>                    
                    </li> : null}                
                </ul>              
            </div>
        </WNavbar>
    )
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,
        currentActivity: state.activity.currentActivity
    }
}

export default connect(mapStateToProps, ({ signOut }))(WNavigation);