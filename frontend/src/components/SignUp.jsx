import React from 'react';
import { Wrapper, Title } from '../styledcomponents';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { signUp } from '../actions';
import Navigation from './Navigation';
import SignUpForm from './forms/SignUpForm';
import Footer from './Footer'

const SUpContainer = styled.section`
    margin:${props => (props.tall ? '0' : '1vh auto 1vh auto')};
    min-height:${props => (props.tall ? '40vh' : '70 vh')};
    height:100%;
    width: ${props => (props.tall ? '100%' : '70%')};
    padding-top:2vh 1vh;
    background:${props => (props.tall? 'white' : '')};
    position:relative;
    z-index:2;
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


const SignIn = (props) => {
    const onSubmit = (formValues) => {
        console.log(formValues)
        props.signUp(formValues);
    }
    return(
        <React.Fragment>
                             
            <Wrapper>
            <Navigation/>   
                <SUpContainer>
                    <Title>Create an account for free!</Title>
                    <div className="row">
                        <HCol className="col-lg-6">
                            <HImg  src={require('../svg/login.svg')} alt="home"/>                             
                        </HCol>   
                        <HCol className="col-lg-6">
                            <SignUpForm onSubmit={onSubmit}/>
                        </HCol>
                    </div>
                </SUpContainer>
                    
            </Wrapper>
            <Footer/>        
        </React.Fragment>
    )
}

export default connect(null, { signUp })(SignIn);