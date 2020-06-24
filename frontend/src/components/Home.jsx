import React, { useEffect } from 'react';
import { Wrapper } from '../styledcomponents'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import styled from 'styled-components';
import Navigation from './Navigation';
import Footer from './Footer';
import server from '../apis/server'
const HContainer = styled.section`
    margin:${props => (props.tall ? '0' : '1vh auto 1vh auto')};
    min-height:${props => (props.tall ? '40vh' : '60 vh')};
    height:100%;
    width: ${props => (props.tall ? '100%' : '70%')};
    padding-top:2vh 1vh;
    background:${props => (props.tall? 'white' : '')};
`;
const WContainer = styled.section`
    margin:${props => (props.tall ? '0' : '0vh auto 0vh auto')};
    min-height:${props => (props.tall ? '40vh' : '60 vh')};
    height:100%;
    width: ${props => (props.tall ? '100%' : '70%')};
    padding-top:2vh 1vh;
    background:${props => (props.tall? 'white' : 'white')};
`;
const HImgContainer = styled.div`
    margin:${props => (props.tall ? '0' : '0vh auto 0vh auto')};
    min-height:${props => (props.tall ? '30vh' : '70vh')};
    height:100%;
    width: 50%;
    padding:3vh 5vh;   
`;
const HHeader = styled.h1`
    color:white;
    font-size:${props => (props.small ? '3.7vh' : '4.7vh')};
    height: 8vh;
    text-align:${props => (props.small ? 'center' : 'left')};
    margin:auto;
    margin-top:7vh;
    position:relative;
    z-index:2;
`;
const Hlead = styled.p`
    padding-top:4vh;
    text-align:${props => (props.center ? 'center' : 'left')};
    color:${props => (props.black ? 'black' : 'white')};
    font-size:${props => (props.small ? '2vh' : '3vh')};
`;

const HBtn = styled.button`
    margin-top:1vh;
    appearance: none;
    outline: 0;  
    background-color: ${props => (props.primary ? '#DBD630' : 'white')};
    border: 0;
    padding: 1vh 1.4vh;
    color: ${props => (props.primary ? '#fff' : '#50a3a2')};
    border-radius: 1.7vh;
    width: 170px;
    font-size: 1.6vh;
    margin: 5% 3% 5% 0;
`;
const HImg = styled.img`
    display: block;
    margin:7vh auto 7vh auto;
    width: ${props => (props.small ? '50%' : '80%')};
`;
/*
const HRow = styled.div`
    background:white;
`;
*/
const HCol = styled.div`
    padding:${props => (props.small ? '1vh 1vh 1vh 1vh' : '0')};
    margin-top:3vh;   
`;

const Home = (props) => {
    const send = async () =>{
        props.fetchUser();
        const response = await server.get('/user');
        console.log(response.data[0].username);
      }
    useEffect(() => {      
        send();
    },[]);

    return(
        <React.Fragment>       
            <Wrapper home>  
            <Navigation/>
                <HContainer>
                    <div className="row">
                        <HCol className="col-lg-6">
                            <HHeader>Grow your productivity!</HHeader>    
                            <Hlead>Perfect for procrastinators that'd like to <br/>end procrastination!</Hlead> 
                            <br/>       
                            <hr/>      
                            <HBtn as = {Link} to= "/signUp"className = "btn btn-lg" primary>Try Now</HBtn>                         
                            <HBtn className = "btn btn-lg">Learn More</HBtn>                              
                        </HCol>   
                        <HCol className="col-lg-6">
                            <HImg src={require('../svg/organizer.svg')} alt="home"/>
                        </HCol>
                    </div>
                    <div className="row">
                        <HCol className="col-lg-6">
                            <HImg small src={require('../svg/responsive.svg')} alt="home"/>
                        </HCol>
                        <HCol className="col-lg-6">
                            <hr/>
                            <Hlead center>Check your tasks at any moment, from <br/>any place!</Hlead>   
                            <Hlead center small>Where you are at home using your laptop, or out using your phone!</Hlead>                                                  
                        </HCol> 
                    </div>
                    <hr/>
                </HContainer>              
                <HHeader small>Why so useful?</HHeader>   
                <HImgContainer> 
                    <div className="row">
                        <HCol className="col-lg-6">
                        <Hlead center>Organize deadlines, notes and much more for a given activity!</Hlead>   
                            <Hlead center small>Easily set remainders, deadlines or simply add anything that is in your mind.</Hlead>              
                        </HCol>   
                        <HCol className="col-lg-6">
                            <HImg small src={require('../svg/todo.svg')} alt="home"/>
                        </HCol>
                    </div>  
                    <hr/>
                    <div className="row">
                        <HCol className="col-lg-6">
                            <HImg small src={require('../svg/timer.svg')} alt="home"/>
                        </HCol>
                        <HCol className="col-lg-6">
                            <Hlead center>Set timers and increase your productivity!</Hlead>   
                            <Hlead center small>Create sessions to fully focus on your task and record such sessions for a given activity!</Hlead>                                
                        </HCol>                    
                    </div>
                    <hr/>
                    <div className="row">                         
                        <HCol className="col-lg-6">
                            <Hlead center>Track your productive hours either daily, weekly or monthly!</Hlead>   
                            <Hlead center small>See what how much time you have dedicated to a task and notice your success!</Hlead>  
                        </HCol>
                        <HCol className="col-lg-6">
                            <HImg small src={require('../svg/chart.svg')} alt="home"/>         
                        </HCol> 
                    </div>                 
                </HImgContainer>                        
            </Wrapper>        
            <Footer/>
        </React.Fragment>
    )
}

export default connect(null, { fetchUser })(Home);