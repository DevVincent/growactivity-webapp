import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

const FormContainer = styled.div`
    margin: auto;
    padding: 40px 0;
    text-align: center;
    height:30%;
    width:60%;
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
class NewTodoForm extends React.Component{

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
                <FormInput className="" {...input} autoComplete="off" id="noteBody"/>
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {//(event){event.prevent.default()} not neccessary. redux-form takes care of it
        this.props.onSubmit(formValues);
        //document.getElementById("noteBody").value = "";
        
    }

    render(){
        //handle submit comes from the redux-form lib... it takes care of preventing default of event... 
        //so props of onSubmit can actually store more important data like the form values (formValues)

        //props.handleSubmit comes from redux-form
        return(    
            <FormContainer>      
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <Field 
                        name="tbody" 
                        component={this.renderInput} 
                        label="New Note" 
                    />
                    <FormBtn>Add</FormBtn>
                </form>
            </FormContainer>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.tbody){
        errors.tbody = "You must enter a text"
    }
    return errors;
}

// export default connect(null, { createStream })(reduxForm({ form: 'streamCreate', validate })(StreamForm));

export default reduxForm({ form: 'newTodoForm', validate })(NewTodoForm);