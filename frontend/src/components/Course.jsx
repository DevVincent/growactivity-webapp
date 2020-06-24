import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color: red;
    font-size: 12rem;
`;
const Course = () => {
    return(
        <div>
            <Title>My styled title.</Title>
        </div>
    )
}

export default Course;