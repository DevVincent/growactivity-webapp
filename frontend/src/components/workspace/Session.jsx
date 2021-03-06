import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AvatarContainer = styled.div`
    margin-top:8vh;
    width:100%;
    min-height:30vh;
    height:100%;
    padding:1vh 1vh;
    position:sticky;
    background: rgba(0, 25, 97, .02);
`;
const Greeting = styled.p`
    text-align:center;
    color:white;
    font-size:1.7rem;
    padding:1vh 1vh;
`;
const ImgContainer = styled.div`
    width:16vh;  
    margin:auto;
`;
const AvatarImg = styled.img`
    width:16vh;
`;
const UlCointainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const AvatarUl = styled.ul`
    padding-left:0;
    display:flex;
    flex-direction:column;
    width:20%
    padding:1vh 1vh;
`;
const AvatarLi = styled.li`
    color:white;
    list-style:none;
    padding:.5vh .5vh;
    font-size:1.2rem;
    text-align:center;
`;

const Session = (props) => {
    return(
        <AvatarContainer>
            <Greeting>Session</Greeting>
            <ImgContainer>
                <AvatarImg src={require('../../svg/session.svg')} alt="avatar"/>
            </ImgContainer>
            <hr/>
            <UlCointainer>
                <AvatarUl>
                    <AvatarLi>Start Session</AvatarLi>
                    <AvatarLi>Chart</AvatarLi>
                </AvatarUl>
            </UlCointainer>
        </AvatarContainer>
    )
}

export default Session;