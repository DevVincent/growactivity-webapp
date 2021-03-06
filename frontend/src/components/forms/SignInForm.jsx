import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormContainer, FormInput, FormBtn, FormLabel, Title } from '../../styledcomponents'

class SignInForm extends React.Component{

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

    onSubmit = (formValues) => {//(event){event.prevent.default()} not neccessary. redux-form takes care of it
        this.props.onSubmit(formValues);
    }

    render(){
        //handle submit comes from the redux-form lib... it takes care of preventing default of event... 
        //so props of onSubmit can actually store more important data like the form values (formValues)

        //props.handleSubmit comes from redux-form
        return(    
            <FormContainer>      
                <Title small>Login to your account</Title>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <Field 
                        name="username" 
                        component={this.renderInput} 
                        label="Username" 
                    />
                    <Field 
                        name="password" 
                        component={this.renderPassword} 
                        type="password"
                        label="Password" 
                    />
                    <FormBtn>Sign In</FormBtn>
                </form>
            </FormContainer>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.username){
        errors.username = "You must enter a username"
    }
    if(!formValues.password){
        errors.password = "You must enter a password"
    }
    return errors;
}

// export default connect(null, { createStream })(reduxForm({ form: 'streamCreate', validate })(StreamForm));

export default reduxForm({ form: 'signInForm', validate })(SignInForm);