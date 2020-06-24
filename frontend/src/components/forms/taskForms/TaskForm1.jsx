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
    
    width:100%;
`;
const FormInput = styled.input`
    border: 1px solid rgba(252, 252, 252, 0.4);
    background-color: rgba(252, 252, 252, 0.2);
    width: 140px;
    border-radius: 3px;
    font-family: "Source Sans Pro", sans-serif;
    padding: 6px 14px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    font-weight: 300;
`;
const FormInputArea = styled.textarea`
    border: 1px solid rgba(252, 252, 252, 0.4);
    background-color: rgba(252, 252, 252, 0.2);
    width: 140px;
    border-radius: 3px;
    font-family: "Source Sans Pro", sans-serif;
    padding: 6px 14px;
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
    padding: 5px 8px;
    color: #50a3a2;
    border-radius: 3px;
    width: 110px;
    font-size: 18px;
`;
const FormLabel = styled.label`
    font-size: 20px;
    font-weight: 200;
    color:white;
    padding: 8px 12px;
`;
class TaskForm1 extends React.Component{
    //////////////////////////////////////////////

    state = {isClicked:false,rows:1};

    handleClick = () => {
        this.setState({isClicked: true, rows:2})
    };
    //////////////////////////////////////////////
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
                <FormInput className="" {...input} autoComplete="off" placeholder={label}/>
                {this.renderError(meta)}
            </div>
        );
    }
    renderInputDetails = ({ input, label, meta }) => {//arrow function notation to fix unknown value of this
        //destructiring (formProps.input) ... and everything is send by the Field props, like label
        //new jsx syntax... makes the input inherit all the props from formProps
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormInputArea className="" {...input} autoComplete="off" placeholder={label} rows={this.state.rows}/>
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
                <FormInput className="" {...input} autoComplete="off" type="time"/>
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues) => {//(event){event.prevent.default()} not neccessary. redux-form takes care of it
        const values = {...formValues, date:this.props.date}
        this.props.onSubmit(values);
        this.setState({rows:1})
    }

    render(){
        //handle submit comes from the redux-form lib... it takes care of preventing default of event... 
        //so props of onSubmit can actually store more important data like the form values (formValues)

        //props.handleSubmit comes from redux-form
        return(    
            <FormContainer>  
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} onMouseEnter={() => this.setState({isClicked: true, rows:2})}
                    onMouseLeave={() => this.setState({isClicked: false, rows:1})}>
                    {
                    this.state.isClicked ?
                    <Field 
                        name="title" 
                        component={this.renderInput} 
                        label="Title" 
                    />
                    : 
                    null
                    }
                    <Field 
                        name="details" 
                        component={this.renderInputDetails} 
                        label="Take a note..." 
                    />
                    {
                    this.state.isClicked ?
                    <FormBtn>Add</FormBtn>
                    : 
                    null
                    }
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
    return errors;
}

// export default connect(null, { createStream })(reduxForm({ form: 'streamCreate', validate })(StreamForm));

export default reduxForm({ form: 'newGoalForm1', validate })(TaskForm1);