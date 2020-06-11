import React from 'react';
import { Wrapper, Title } from '../styledcomponents';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import Navigation from './Navigation';
import SignInForm from './forms/SignInForm';




const SignIn = (props) => {
    const onSubmit = (formValues) => {
        console.log(formValues)
        props.signIn(formValues);
    }
    return(
        <React.Fragment>
                               
            <Wrapper>
            <Navigation/> 
                <div className = "ui container">
                    <Title>Sign In</Title>
                    <SignInForm onSubmit={onSubmit}/>
                </div>
            </Wrapper>        
        </React.Fragment>
    )
}

export default connect(null, { signIn })(SignIn);