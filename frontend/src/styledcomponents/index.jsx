import styled from 'styled-components';

export const Wrapper = styled.div`
    background: linear-gradient(90deg, #1CB5E0 0%, #003961 100%);
    min-height: ${props => (props.home ? '65vh' : '100vh')};
    height: 100%;
    width: 100%;
`;
export const WorkWrapper = styled.div`
    min-height:100vh;
    display:flex;
    height: 100%;
    width: 100%;
    background: #228C9A;
`;

export const ActivityItem = styled.div`
    height:10vh;
    width: 100%;
    margin-bottom:3vh;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding: 50px 10px;
`;

export const Navbar = styled.nav`
    padding:1.5vh 1.5vh;
    position:sticky;
    background: linear-gradient(90deg, #1CB5E0 0%, #003961 100%);
`;

export const FormContainer = styled.div`
    margin: 10% auto;
    padding: 80px 0;
    text-align: center;
    width:30%;
`;

export const FormInput = styled.input`
    border: 1px solid rgba(252, 252, 252, 0.4);
    background-color: rgba(252, 252, 252, 0.2);
    width: 300px;
    border-radius: 3px;
    font-family: "Source Sans Pro", sans-serif;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    font-weight: 300;
`;

export const FormBtn = styled.button`
    margin-top:1vh;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #50a3a2;
    border-radius: 3px;
    width: 180px;
    font-size: 18px;
`;
export const SecondaryBtn = styled.button`
    margin-top:1vh;
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 5px 1px;
    color: #50a3a2;
    border-radius: 3px;
    width: 80px;
    margin-left:1vh;
    font-size: 15px;
`;
export const MainBtn = styled.button`
    margin-top:1vh;
    appearance: none;
    outline: 0;
    background-color: orange;
    border: 0;
    padding: 10px 15px;
    color: white;
    border-radius: 3px;
    width: 160px;
    font-size: 18px;
    margin-left:1vh;
`;

export const FormLabel = styled.label`
    font-size: 30px;
    font-weight: 200;
    color:white;
    padding: 10px 15px;
`;

export const PresentationImg = styled.img`
    
`;
export const Footer = styled.footer`
    width:100%;
    height:6vh;
    background:#E9ECEF;
`;