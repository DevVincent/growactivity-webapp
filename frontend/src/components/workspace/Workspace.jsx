import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { resetTodos, resetGoals, fetchTodos, fetchGoals, setActivity, fetchActivities } from '../../actions';
import { Link } from 'react-router-dom';
import WNavigation from './WNavigation';
import WorkspaceFooter from './WorkspaceFooter';
import Avatar from './Avatar';
import Session from './Session'
import SmallTodos from './SmallTodos';
import Tasks from './Tasks';
import Deadlines from './Deadlines'
import history from '../../history';
//background: linear-gradient(90deg, #1CB5E0 0%, #003961 100%);
//
const WorkWrapper = styled.section`   
    background:linear-gradient(90deg, #0099E0 0%, #001961 100%);
    position:relative;
    z-index:0; 
    min-height: ${props => (props.home ? '65vh' : '94vh')};
    width: 100%;
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
const SideContentLeft = styled.div`
    position: sticky;
    top: 6.3vh; 
    min-height:70vh;
    height:100%;
    width: 15%;
    display:flex;
    flex-direction:column;
`;
const SideContent = styled.div`
    position: sticky;
    top: 6.3vh; 
    min-height:70vh;
    height:100%;
    width: 15%;
    align-items:flex-start;
`;
/*
const Container = styled.div`
    min-height:45vh;
    height:100%;
    width: 100%;
    margin: auto;
    padding:10vh 1vh 1vh 1vh;
    position:relative;
    z-index:2;
`;
*/

const GoalsContainer = styled.div`  
    min-height:60vh;
    background: rgba(0, 25, 97, .03);
    color:white;
    width: 90%;
    margin:auto;
    
`;
const Title = styled.h1`
    font-size:3rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding:.5vh 1vh;
    margin-bottom:2vh;
`;
const NoteContainer = styled.div`
    width:40%;
    margin:auto;
`;
const FormBtn = styled.button`
    appearance: none;
    outline: 0;
    border: 0;
    background-color: white;   
    padding: 10px 15px;
    color: #50a3a2;
    border-radius: 3px;
    width: 140px;
    font-size: 18px;
    align-self:center;
`;
const Workspace = (props) => {
    
    const init = () =>{
        props.resetTodos()  
        props.resetGoals() 
        if(!props.isSignedIn){
          history.push('/signIn')
        }
        
        props.setActivity(props.match.params.id)
        props.fetchTodos(props.match.params.id) 
        //props.fetchGoals(props.match.params.id)   
        
    }

    useEffect(() => {    
        init();     
    }, []);

    const renderTitle = () => {
        const activity = props.activities.find(function(activity){
            return activity._id === props.currentActivity
        });
        if(typeof activity !== 'undefined'){
            return activity.title
        }else{
            return "Title: not found."
        }
    }

    return(    
        <React.Fragment>        
            <WorkWrapper className="Workspace">
            <WNavigation/>          
                <Main>
                    <SideContentLeft>
                        <Avatar user={props.currentUser}/>
                        <Session user={props.currentUser}/>
                    </SideContentLeft>
                        <Content>  
                            <Title>{renderTitle()}</Title>                 
                            
                            <GoalsContainer>
                                <Tasks/>                      
                            </GoalsContainer>                       
                            <hr/>
                            <Deadlines/>

                        </Content>
                    <SideContent>
                        <Link to={`/activities/${props.match.params.id}/workspace/todos`}><SmallTodos/></Link>
                        <hr/>
                        <NoteContainer>
                            <Link to={`/activities/${props.match.params.id}/workspace/todos`}><FormBtn>See More</FormBtn></Link> 
                        </NoteContainer>                  
                    </SideContent>
                </Main>                
            </WorkWrapper>
            <WorkspaceFooter/>
        </React.Fragment>
    )
}
//<Link to={`/activities/${props.currentActivity}/workspace/todos`}><SmallTodos/></Link> 
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,
        currentUser: state.user.userInfo,
        activities: Object.values(state.activity.activities),
        currentActivity: state.activity.currentActivity,
        empty: state.activity.activitiesAreEmpty
    }
}

export default connect(mapStateToProps, { resetTodos, fetchActivities, fetchTodos, fetchGoals, resetGoals, setActivity })(Workspace);