import React from 'react';
import { Wrapper, Title } from '../styledcomponents';
import Navigation from './Navigation';

const About = () => {
    return(
        <React.Fragment>
            <Navigation/>
            <Wrapper>
                <Title>About</Title>
            </Wrapper>
        </React.Fragment>
    )
}

export default About;