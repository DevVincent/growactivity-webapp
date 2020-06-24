import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchActivities, resetActivities, fetchUser, setActivity } from '../../actions';
import { Link } from 'react-router-dom';
import { Wrapper, Title, SecondaryBtn } from '../../styledcomponents';
import styled from 'styled-components';
import Navigation from '../Navigation';
import Avatar from '../workspace/Avatar';
import Footer from '../Footer'
import history from '../../history';

const SideContentLeft = styled.div`
    position: sticky;
    top: 6.3vh; 
    min-height:70vh;
    height:100%;
    width: 15%;
    display:flex;
    flex-direction:column;
`;
const Main = styled.div`
    width:100%;
    min-height:20vh;
    display:flex;
    flex-direction:row;
`;
const Content = styled.div`
    min-height:80vh;
    height:100%;
    width: 70%;
    margin:auto;
    padding:0.5vh 1vh 1vh 1vh;
    position:relative;
    z-index:2;
`;
const AContainer = styled.section`
    height:100%;
    min-height:60vh;
    width: 50%;
    margin: auto;
    padding:3vh 4vh 3vh 4vh;
    position:relative;
    z-index:2;
`;
const Activity = styled.div`
    height:22vh;
    width:100%;
    background:rgba(25, 181, 224, 0.1);
    margin:auto;
    margin: 2vh 0vh;
    border-radius:10px;
`;
const ActivityP = styled.p`
    width:100%;
    font-size: 1.2rem;
    text-align: center;
    color: white;
    padding: 10px 0vh;
`;
const ActivityContent = styled.div`
    border-radius:10px; 
    height:17.5vh;    
    margin: 0vh 0vh;
    display: flex;
    background:rgba(28, 181, 224, .15);
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
    const [initialState, setInitialState] = useState('')
    const init = async () =>{
        props.resetActivities()
        if(!props.isSignedIn){
          history.push('/signIn')
        }   
        await props.fetchActivities(props.currentUserID);               
    }

    useEffect(() => {    
        init();     
    }, [initialState]);
    
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
                        <Link to={`/activities/${activity._id}/workspace`}><SecondaryBtn onClick={()=>props.setActivity(activity._id)}>Start</SecondaryBtn></Link>
                        <Link to={`/activities/${activity._id}/deleteActivity`}><SecondaryBtn>Delete</SecondaryBtn></Link>
                    </Activity>             
            )
        });
    }
    return(
        <React.Fragment>
            
            <Wrapper>  
                <Navigation/>
                <Main>
                <SideContentLeft>
                    <Avatar user={props.currentUser}/>
                </SideContentLeft>
                <Content>
                    <AContainer>   
                        <Title>My Activities</Title>
                            <Link to='/activities/createActivity'><NewBtn>New Activity</NewBtn></Link>         
                            {renderActivities()}
                    </AContainer>
                </Content>
                <SideContentLeft>
                    
                </SideContentLeft>
                </Main>             
            </Wrapper>
            <Footer/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        activities: Object.values(state.activity.activities),
        isSignedIn: state.user.isSignedIn,
        currentUserID: state.user.userInfo._id,
        currentUser: state.user.userInfo
    }
}

export default connect(mapStateToProps, { fetchActivities, resetActivities, fetchUser, setActivity })(ListActivities);   