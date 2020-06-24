import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AvatarContainer = styled.div`
    margin-top:3.5vh;
    width:100%;
    min-height:20vh;
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
    width:12vh;  
    margin:auto;
`;
const AvatarImg = styled.img`
    width:12vh;
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

const Avatar = (props) => {
    return(
        <AvatarContainer>
            <Greeting>{props.user.username}</Greeting>
            <ImgContainer>
                <AvatarImg src={require(`../../svg/${props.user.avatar}.svg`)} alt="avatar"/>
            </ImgContainer>
            <hr/>
            <UlCointainer>
                <AvatarUl>
                    <AvatarLi>Profile</AvatarLi>
                    <AvatarLi>Settings</AvatarLi>
                </AvatarUl>
            </UlCointainer>
        </AvatarContainer>
    )
}

export default Avatar;