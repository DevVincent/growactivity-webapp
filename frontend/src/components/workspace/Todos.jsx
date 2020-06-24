import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteTodo, createTodo, fetchTodos } from '../../actions';
import NewTodoForm from '../forms/NewTodoForm';
import WNavigation from './WNavigation';
import WorkspaceFooter from './WorkspaceFooter';
import history from '../../history';

const WorkWrapper = styled.div`
    background:linear-gradient(90deg, #0099E0 0%, #001961 100%);
    position:relative;
    z-index:0;
    min-height: ${props => (props.home ? '65vh' : '100vh')};
    height: 100%;
    width: 100%;
`;
const Content = styled.section`
    min-height:95vh;
    height:100%;
    width: 70%;
    margin: auto;
    padding:2vh 1vh 1vh 1vh;
    position:relative;
    z-index:1;
`;
const TodoUl = styled.ul`
    padding: 1vh 0.5vh 1vh 1vh;
    min-height:30vh;
    height:100%;
    background: rgba(0, 25, 97, .1);
    border-radius:10px;  
    color:white;
    width:40%;
    margin:auto;
    list-style: none;
    padding-left:0;
`;
const TodoLi= styled.li`
    margin: 1rem 1rem 1rem 1rem;
    background: rgba(0, 25, 97, .3);
    color:white;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height:4vh;
    height:100%;
    transition: all 0.5s ease;  
    flex: 1;
`;
/*
const Title = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding: 20px 10px;
`;
*/
const Btns = styled.div`
    display:flex;
    flex-direction:row;
`;
const TodoBtn = styled.button`
    appearance: none;
    outline: 0;
    background: linear-gradient(90deg, #0099E0 0%, #001961 100%);
    border: 0;
    margin-right:1vh;
    color: white;
    border-radius: 10px;
    width: 60px;
    font-size: 1.4vh;
`;

const Todos = (props) => {
    const init = async () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }   
        //props.fetchTodos(props.match.params.id)   
        //console.log("Activity id "+props.match.params.id);      
    }

    useEffect(() => {    
        init();     
    }, []);
    const deleted = (id) => {
        props.deleteTodo(id);
    }
    const renderTodos = () => {
        return props.todos.map(todo=>{
            return (
                <TodoLi key={todo._id}>
                    {todo.body}
                    <Btns>
                        <TodoBtn>Check</TodoBtn>
                        <TodoBtn onClick={()=> deleted(todo._id)}>Delete</TodoBtn>
                    </Btns>
                </TodoLi>
            )
        });
    }
    const onSubmit = (formValues) => {
        props.createTodo({ ...formValues, aId: props.currentActivity});    
        console.log(formValues);    
    }

    return(       
        <React.Fragment> 
                            
            <WorkWrapper>
            <WNavigation/>                   
                <Content>    
                                      
                        <NewTodoForm onSubmit={onSubmit}/>
                                
                    <TodoUl>
                        {renderTodos()}
                    </TodoUl>                   
                </Content>
            </WorkWrapper>
            <WorkspaceFooter/>
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
export default connect(mapStateToProps, { fetchTodos, deleteTodo, createTodo })(Todos);