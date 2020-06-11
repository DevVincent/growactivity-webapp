import React from 'react';
import { Wrapper, Title } from '../styledcomponents';
import Navigation from './Navigation';

const Contact = () => {
    return(
        <React.Fragment>
            <Navigation/>
            <Wrapper>
                <Title>Contact</Title>
            </Wrapper>
        </React.Fragment>
    )
}

export default Contact;