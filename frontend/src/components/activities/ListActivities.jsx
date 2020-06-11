import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchActivities, fetchUser } from '../../actions';
import { Link } from 'react-router-dom';
import { Wrapper, Title, SecondaryBtn, Footer } from '../../styledcomponents';
import styled from 'styled-components';
import Navigation from '../Navigation';
import history from '../../history';

const Activities = styled.section`
    height:100%;
    width: 40%;
    margin: auto;
    padding:1vh 1vh 1vh 1vh;
`;

const Activity = styled.div`
    height:20vh;
    width:100%;
    background:rgba(252, 252, 252, 0.2);
    margin:auto;
    margin: 2vh 0vh;
    border-radius:10px;
`;
const ActivityP = styled.p`
    width:100%;
    font-size: 1.2rem;
    text-align: center;
    color: black;
    padding: 10px 0vh;
`;
const ActivityContent = styled.div`
    border-radius:10px; 
    height:16vh;    
    margin: 0vh 0vh;
    display: flex;
    background:white;
`;
const ActivityChart = styled.div`
    width:50%;
`;
const ActivityDetails = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
`;
const NewBtn = styled.button`
    margin-top:1vh;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #50a3a2;
    border-radius: 30px;
    width: 150px;
    font-size: 20px;
`;

const ListActivities = (props) => {
   
    const init = async () =>{
        props.fetchUser();
        if(!props.isSignedIn){
          history.push('/signIn')
        }
        if(props.activities.length === 0 || props.activities[0] === 'undefined'){//check if inital state is empty to fetch only once
            await props.fetchActivities(props.currentUserID);    
        }            
    }

    useEffect(() => {    
        init();     
    }, []);
    
    const renderActivities = () => {
        return props.activities.map(activity => {        
            return(            
                    <Activity key={activity._id}>
                            <ActivityContent>
                                <ActivityChart>
                                    I am the future chart
                                </ActivityChart>
                                <ActivityDetails>
                                    <ActivityP>{activity.title}</ActivityP>                                 
                                    <ActivityP>{activity.description}</ActivityP>
                                    <ActivityP>Next Deadline: null</ActivityP>
                                </ActivityDetails>                    
                            </ActivityContent>
                        <Link to={`/activities/${activity._id}/workspace`}><SecondaryBtn>Start</SecondaryBtn></Link>
                        <Link to={`/activities/${activity._id}/deleteActivity`}><SecondaryBtn>Delete</SecondaryBtn></Link>
                    </Activity>
                
            )
        })
    }
    return(
        <React.Fragment>
            
            <Wrapper>  
                <Navigation/>
                <Activities>   
                    <Title>My Activities</Title>
                        <Link to='/activities/createActivity'><NewBtn>New Activity</NewBtn></Link>
                        <div className="ui celled list">
                            {renderActivities()}
                        </div>                
                </Activities>             
            </Wrapper>
            <Footer/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        activities: Object.values(state.activity),
        isSignedIn: state.user.isSignedIn,
        currentUserID: state.user.userInfo._id
    }
}

export default connect(mapStateToProps, { fetchActivities, fetchUser })(ListActivities);   