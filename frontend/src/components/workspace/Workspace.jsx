import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { WorkWrapper, Footer } from '../../styledcomponents';
import styled from 'styled-components'
import WorkspaceNav from './WorkspaceNav'
import history from '../../history';

const Content = styled.section`
    height:95vh;
    width: 80%;
    margin: auto;
    padding:1vh 1vh 1vh 1vh;
`;
const Deadlines = styled.div`
    height:13vh;
    background:rgba(252, 252, 252, 0.2);
    border-radius:20px;
    width:60%;
    margin:auto;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding: 20px 10px;
`;

const Workspace = (props) => {
    useEffect(() => {
        const checkSignedIn = () =>{
          if(!props.isSignedIn){
            history.push('/signIn')
          }
        }
        checkSignedIn();
    })
    const renderTitle = () => {
        const title = props.activities.filter(function(a){
            return a._id === props.match.params.id
         });
        if(typeof(title) === 'undefined'){
            return 'sucks';
        }else{
            return title[0].title;
        }
    }
    return(    
        <React.Fragment>                  
            <WorkWrapper>        
                <WorkspaceNav/>
                <Content>
                    <Title>Activity: {'__________________________________________ '}</Title>
                        <br/>
                        <br/>
                    <Deadlines>
                        <br/>
                        Deadline: 13 days away
                    </Deadlines>
                </Content>
            </WorkWrapper>
            <Footer/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,
        activities: Object.values(state.activity)
    }
}

export default connect(mapStateToProps)(Workspace);