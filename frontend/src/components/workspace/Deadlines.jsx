import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchDeadlines } from '../../actions';

import styled from 'styled-components'

import history from '../../history';
import moment from 'moment'

const DeadlinesContainer = styled.div`
    height:13vh;
    background: rgba(0, 25, 97, .1);
    border-radius:10px;  
    color:white;
    width:60%;
    margin:auto;
    padding-bottom:2vh;
`;

const Deadlines = (props) => {
  const grabDeadlines = () => {  
        const id = props.currentActivity
        const values = { id: id };
        if(id !== null){
            props.grabDeadlines(values) 
        }else{
            console.log("Error, ID is null.")
        }
    }
  
    const init = () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }   
        //grabDeadlines()
    }

    useEffect(() => {    
        init();     
    }, []);
   
    return(                           
        <DeadlinesContainer>
  
        </DeadlinesContainer>                   
    )
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,   
        goals: Object.values(state.goal), 
        empty: state.activity.activitiesAreEmpty,
        currentActivity: state.activity.currentActivity
    }
}
export default connect(mapStateToProps)(Deadlines);