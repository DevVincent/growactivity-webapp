import React from 'react';
import { Wrapper, Title } from '../styledcomponents';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import Navigation from './Navigation';
import SignUpForm from './forms/SignUpForm';




const SignIn = (props) => {
    const onSubmit = (formValues) => {
        console.log(formValues)
        props.signUp(formValues);
    }
    return(
        <React.Fragment>
                             
            <Wrapper>
            <Navigation/>   
                <div className = "ui container">
                    <Title>Create an Account!</Title>
                    <SignUpForm onSubmit={onSubmit}/>
                </div>
            </Wrapper>        
        </React.Fragment>
    )
}

export default connect(null, { signUp })(SignIn);