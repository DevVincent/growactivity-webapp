import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

const Title = styled.h1`   
    font-size: ${props => (props.small ? '3vh' : '4vh')};
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding: 40px 10px;  
`;
 const FormContainer = styled.div`
    margin:auto;
    text-align: center;
    height:100%;
    
    width:30%;
`;
const FormInput = styled.input`
    border: 1px solid rgba(252, 252, 252, 0.4);
    background-color: rgba(252, 252, 252, 0.2);
    width: 300px;
    border-radius: 3px;
    font-family: "Source Sans Pro", sans-serif;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    font-weight: 300;
`;
const FormBtn = styled.button`
    margin-top:1vh;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #50a3a2;
    border-radius: 3px;
    width: 180px;
    font-size: 18px;
`;
const FormLabel = styled.label`
    font-size: 30px;
    font-weight: 200;
    color:white;
    padding: 10px 15px;
`;
class NewGoalForm extends React.Component{

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
    renderInputDate = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormLabel>{label}</FormLabel>
                <FormInput className="" {...input} autoComplete="off" type="date"/>
                {this.renderError(meta)}
            </div>
        );
    }
    renderInputTime = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormLabel>{label}</FormLabel>
                <FormInput className="" {...input} autoComplete="off" type="time"/>
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
                        name="title" 
                        component={this.renderInput} 
                        label="Set a title for the task" 
                    />
                    <Field 
                        name="details" 
                        component={this.renderInput} 
                        label="Type its details" 
                    />
                    <Field 
                        name="date" 
                        component={this.renderInputDate} 
                        label="Set a date" 
                    />
                    <Field 
                        name="deadline" 
                        component={this.renderInputTime} 
                        label="Set time if it is a deadline" 
                    />
                    <FormBtn>Create Goal</FormBtn>
                </form>
            </FormContainer>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = "You must enter a title"
    }
    if(!formValues.details){
        errors.details = "You must enter the details"
    }
    if(!formValues.date){
        errors.details = "You must enter a date"
    }
    return errors;
}

// export default connect(null, { createStream })(reduxForm({ form: 'streamCreate', validate })(StreamForm));

export default reduxForm({ form: 'newGoalForm', validate })(NewGoalForm);