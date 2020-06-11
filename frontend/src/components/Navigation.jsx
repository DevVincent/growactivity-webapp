import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../actions'
import { Navbar } from '../styledcomponents';
import { connect } from 'react-redux';

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
                    <li className="nav-item">
                        <Link to='/about' className="nav-link">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/contact' className="nav-link">
                            Contact
                        </Link>
                    </li>
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