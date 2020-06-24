import React from 'react'
import styled from 'styled-components'

const FContainer = styled.footer`
    width:100%;
    height:6vh;
    background:linear-gradient(90deg, #0099E0 0%, #001961 100%);
`;
const Flead = styled.p`
    text-align:${props => (props.center ? 'center' : 'left')};
    color:${props => (props.black ? 'black' : 'white')};
    font-size:${props => (props.small ? '1.4vh' : '2vh')};
    padding:1vh 1vh 1vh 1vh;
`;
const Fspan = styled.span`
    cursor:pointer;
    color:#E9ECEF;
`;
const WorkspaceFooter = () => {
    const currentYear = new Date().getFullYear();
    return(
        <FContainer>
            <Flead small center>GrowActivity ⓒ {currentYear}. All rights reserved. <Fspan>Privacy</Fspan> | <Fspan>Security</Fspan> | <Fspan>Cookies Policy</Fspan></Flead>
        </FContainer>
    )
}

export default WorkspaceFooter;