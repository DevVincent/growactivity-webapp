import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormContainer, FormInput, FormBtn, FormLabel, Title } from '../../styledcomponents'
import styled from 'styled-components'
import './signUp.css'
const AvatarImg = styled.img`
    width:7vh;
`;
const AvatarContainer = styled.div`
    width:20%;
    display:inline-block;
`;
class SignUpForm extends React.Component{

    renderError({ touched, error }){//(meta)
        if (touched && error){          
            return(
                <div>
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormLabel>{label}</FormLabel>
                <FormInput className="" {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    renderPassword = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormLabel>{label}</FormLabel>
                <FormInput className="" {...input} type="password" autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    renderChoiceA = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormInput className="" {...input} type="radio" value="female" autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    renderChoiceB = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormInput className="" {...input} type="radio" value="male" autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues) => {//(event){event.prevent.default()} not neccessary. redux-form takes care of it
        this.props.onSubmit(formValues);
    }

    render(){
        //handle submit comes from the redux-form lib... it takes care of preventing default of event... 
        //so props of onSubmit can actually store more important data like the form values (formValues)

        //props.handleSubmit comes from redux-form
        return(    
            <FormContainer>      
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <Field 
                        name="email" 
                        component={this.renderInput} 
                        label="Email" 
                    />
                    <Field 
                        name="username" 
                        component={this.renderInput} 
                        label="Username" 
                    />
                    <Field 
                        name="password" 
                        component={this.renderPassword} 
                        label="Password" 
                    />  
                    <div> 
                        <Title small>Choose Avatar</Title>
                        <AvatarContainer>
                            <label>
                                <Field 
                                    name="avatar" 
                                    component={this.renderChoiceA} 
                                />
                                <AvatarImg src={require('../../svg/female.svg')} className=""/>
                            </label>
                        </AvatarContainer>
                        <AvatarContainer>
                            <label>
                                <Field 
                                    name="avatar" 
                                    component={this.renderChoiceB}   
                                />
                                <AvatarImg src={require('../../svg/male.svg')} className=""/>
                            </label>
                        </AvatarContainer>
                    </div>        
                    <FormBtn>Create Account</FormBtn>
                </form>
            </FormContainer>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.email){
        errors.email = "You must enter an email"
    }
    if(!formValues.username){
        errors.username = "You must enter a username"
    }
    if(!formValues.password){
        errors.password = "You must enter a password"
    }
    return errors;
}

// export default connect(null, { createStream })(reduxForm({ form: 'streamCreate', validate })(StreamForm));

export default reduxForm({ form: 'signInForm', validate })(SignUpForm);