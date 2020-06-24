import styled from 'styled-components'

export const STasks = styled.section`
    max-height:50vh;
    height:100%;
    width: 100%;
    display:flex;
    flex-direction:row;
    margin: auto;
    padding:.5vh .5vh ;
    position:relative;
    z-index:1;
    align-items: center;
    justify-content: center;
    overflow: auto
`;
export const TasksLists = styled.div` 
    display:flex;
    flex-direction:row;
    min-height:45vh;
    height:100%;
    width:100%;
    margin:auto;
`;
export const TaskListContainer = styled.div`
    width:100%;
    height:100%;
`;
export const Title = styled.h1`
    font-size:2rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding:1vh 1vh;
`;
export const DayContainer = styled.div`
    width:100%;
    background: rgba(0, 25, 97, .45);
    position:sticky;
    top:0;
`
export const Day = styled.h3`
    font-size:1rem;
    padding: 1vh 1vh;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    
`;
export const Spacer = styled.div`
    width: 20px;
`
export const TaskUl = styled.ul`
    align-self:flex-start;
    padding: 1vh 0.5vh 1vh 1vh;
    min-height:20vh;
    height:100%;
    background: rgba(0, 25, 97, .1);
    border-radius:10px;  
    color:white;
    width:100%;
    margin:auto;
    list-style: none;
    padding-left:0;
`;

export const Btns = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    flex:1;
`;
export const WeekBtns = styled.div`
    display:flex;
    width:10%;
    margin:auto;
`;
export const  Btn = styled.button`
    appearance: none;
    outline: 0;
    border: 0;
    margin-bottom:1vh;
    width: 60px;
    background-color: white;   
    padding: 3px 1px;
    color: #50a3a2;
    border-radius: 3px;
    font-size: 15px;
    align-self:center;
`;