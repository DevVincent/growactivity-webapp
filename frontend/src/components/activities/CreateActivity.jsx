import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createActivity } from '../../actions';
import { Wrapper, Title } from '../../styledcomponents';
import Navigation from '../Navigation';
import history from '../../history';
import NewActivityForm from '../forms/NewActivityForm';

const CreateActivity = (props) => {
    useEffect(() => {
        const checkSignedIn = () =>{
          if(!props.isSignedIn){
            history.push('/signIn')
          }
        }
        checkSignedIn();
    });
    
    const onSubmit = (formValues) => {
        props.createActivity({ ...formValues, id: props.currentUserID});        
    }

    return(
        <React.Fragment>
            <Navigation/>
            <Wrapper>  
                <div className = "ui container">   
                    <Title>Create a New Activity!</Title>
                    <NewActivityForm onSubmit={onSubmit}/>
                </div>
            </Wrapper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,
        currentUserID: state.user.userInfo._id
    }
}

export default connect(mapStateToProps,{ createActivity })(CreateActivity);