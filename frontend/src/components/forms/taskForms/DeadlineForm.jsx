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
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 3px 6px;
    color: #50a3a2;
    border-radius: 3px;
    width: 80px;
    font-size: 15px;
    margin-bottom:0.5vh
`;
const FormLabel = styled.label`
    font-size: 20px;
    font-weight: 200;
    color:white;
    padding: 8px 12px;
`;
class DeadlineForm extends React.Component{
    state = {isClicked:false,rows:1};
    
    handleClick = () => {
        this.setState({isClicked: true, rows:2})
    };
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

    renderInputTime = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return( 
            <div className={className}>
                <FormInput className="" {...input} autoComplete="off" type="time"/>
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues) => {
        const values = {...formValues, Id:this.props.Id, date:this.props.date}
        this.props.onSubmit(values);
    }

    render(){
        return(    
            <FormContainer>  
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} onMouseEnter={() => this.setState({isClicked: true, rows:2})}
                    onMouseLeave={() => {this.setState({isClicked: false, rows:1}); }}>
                        {
                    this.state.isClicked ?
                    <Field 
                        name="time" 
                        component={this.renderInputTime} 
                        label="Add deadline" 
                    />
                    : 
                    null
                    }
                    <FormBtn>Deadline</FormBtn>
                    
                </form>
            </FormContainer>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.time){
        errors.time = "You must enter a time"
    }
    return errors;
}

export default reduxForm({ form: 'deadlineForm', validate })(DeadlineForm);