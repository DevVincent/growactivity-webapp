import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AvatarContainer = styled.div`

`;
const ImgContainer = styled.div`

`;
const AvatarImg = styled.img`

`;
const UlCointainer = styled.div`

`;
const AvatarUl = styled.ul`

`;
const AvatarLi = styled.li`

`;

const Profile = () => {
    return(
        <AvatarContainer>
            <ImgContainer>
                <AvatarImg src={require('../../svg/maleavatar.svg')} alt="avatar"/>
            </ImgContainer>
            <UlCointainer>
                <AvatarUl>
                    <AvatarLi as={Link}>Profile</AvatarLi>
                    <AvatarLi as={Link}>Settings</AvatarLi>
                </AvatarUl>
            </UlCointainer>
        </AvatarContainer>
    )
}

export default Profile;