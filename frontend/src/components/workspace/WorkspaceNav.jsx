import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import history from '../../history';

const WorkNav = styled.nav`
    height:100vh;
    background: rgba(252, 252, 252, 0.2);
    width:12%;  
`;
const NavBtn = styled.button`
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #50a3a2;
    border-radius: 3px;
    width: 180px;
    font-size: 15px;
    margin:auto;
`;
const WorkUl = styled.ul`
    display:flex;
    flex-direction: column;
    
`;
const WorkLi = styled.li`
    height:7vh;
    margin-top:3vh;
    color:white;
    list-style:none;
`;

const WorkspaceNav = (props) => {
    useEffect(() => {
        const checkSignedIn = () =>{
          if(!props.isSignedIn){
            history.push('/signIn')
          }
        }
        checkSignedIn();
    })
    return(
        <React.Fragment>         
            <WorkNav>  
                <WorkUl>                
                    <WorkLi>                    
                        <Link to="/activities"><NavBtn>My Activities</NavBtn></Link>                       
                    </WorkLi>
                    <WorkLi>
                        <Link to="/activities"><NavBtn>Profile</NavBtn></Link>  
                    </WorkLi>
                    <WorkLi>
                        <Link to="/activities"><NavBtn>Chart</NavBtn></Link>   
                    </WorkLi>
                    <WorkLi>
                        <Link to="/activities"><NavBtn>To-do</NavBtn></Link>  
                    </WorkLi>
                    <WorkLi>
                        <Link to="/activities"><NavBtn>Goals</NavBtn></Link>  
                    </WorkLi>               
                    <WorkLi>
                        <Link to="/activities"><NavBtn>Settings</NavBtn></Link>  
                    </WorkLi>
                    <WorkLi>
                        <Link to="/activities"><NavBtn>Sign Out</NavBtn></Link>  
                    </WorkLi>
                </WorkUl>                        
            </WorkNav>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn
    }
}

export default connect(mapStateToProps)(WorkspaceNav);