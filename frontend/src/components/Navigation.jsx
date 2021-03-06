import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../actions'
import { connect } from 'react-redux';

const Navbar = styled.nav`
    padding:1.5vh 1.5vh;
    position:sticky;
    position: -webkit-sticky;
    top: 0;
    background: ${props => (props.workspace ? 'linear-gradient(90deg, #0099E0 0%, #001961 100%)' : 'linear-gradient(90deg, #1CB5E0 0%, #003961 100%)')};
    z-index:0; 
`;

const Navigation = (props) => {
    return(
        <Navbar className="navbar navbar-dark navbar-expand-lg">
            <Link to='/' className="navbar-brand">
                GrowActivity
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
                        <Link to='/activities' className="nav-link">
                            Activities
                        </Link> 
                    </li>: null}
                    {props.isSignedIn ? <li className="nav-item">
                        <Link to='/activities' className="nav-link">
                            Links
                        </Link> 
                    </li>: null}
                    
                    {props.isSignedIn ? <li className="nav-item" onClick={()=>props.signOut()}>
                        <Link to='/' className="nav-link">
                            SignOut
                        </Link>                    
                    </li> : null}
                    
                </ul>              
            </div>
        </Navbar>
    )
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,
    }
}

export default connect(mapStateToProps, ({ signOut }))(Navigation);