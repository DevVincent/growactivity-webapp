import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchTodos } from '../../actions';
import history from '../../history';

const Content = styled.div`
    min-height:30vh;
    height:100%;
    width: 100%;
    margin: auto;
    padding:3.5vh 1vh 1vh 1vh;
    position:relative;
    z-index:2;
    background: rgba(0, 25, 97, .1);
`;
const TodoUl = styled.ul`
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
const TodoLi= styled.li`
    margin: 1rem 1rem 1rem 1rem;
    background: rgba(0, 25, 97, .3);
    color:white;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height:4vh;
    height:100%;
    transition: all 0.5s ease;  
    flex: 1;
`;
const Lead = styled.p`
    text-align:center;
    color:white;
    font-size:1.7rem;
    padding:1vh 1vh;
`;
const SmallTodos = (props) => {
    const init = async () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }     
    }

    useEffect(() => {    
        init();     
    }, []);
    
    const renderTodos = () => {
        return props.todos.slice(0, 10).map(todo=>{
            return (
                <TodoLi key={todo._id}>
                    {todo.body}
                </TodoLi>
            )
        });
    }

    return(       
        <React.Fragment>                              
                <Content>   
                    <Lead>Notes</Lead>                                                                 
                    <TodoUl>
                        {renderTodos()}
                    </TodoUl>                   
                </Content>           
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,   
        todos: Object.values(state.todo), 
        empty: state.activity.activitiesAreEmpty,
        currentActivity: state.activity.currentActivity
    }
}
export default connect(mapStateToProps, { fetchTodos })(SmallTodos);