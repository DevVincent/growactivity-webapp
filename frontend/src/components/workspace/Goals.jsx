import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NewGoalForm from './../forms/NewGoalForm'
import { deleteGoal, createGoal, fetchGoals } from '../../actions';
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
const Tasks = styled.section`
    min-height:35vh;
    height:100%;
    width: 95%;
    display:flex;
    flex-direction:row;
    margin: auto;
    padding:1vh 1vh 1vh 1vh;
    position:relative;
    z-index:1;
`;
const TasksLists = styled.div`
    display:flex;
    flex-direction:row;
    min-height:10vh;
    align-items:top;
    height:100%;
    width:80%;
    margin:auto;
`;
const FormContainer = styled.div`
    min-height:10vh;
    height:100%;
    width: 95%;
    display:flex;
    flex-direction:row;
    margin: auto;
    position:relative;
    z-index:1;
`;
const TaskUl = styled.ul`
    padding: 1vh 0.5vh 1vh 1vh;
    min-height:20vh;
    height:100%;
    background: rgba(0, 25, 97, .1);
    border-radius:10px;  
    color:white;
    width:40%;
    margin:auto;
    list-style: none;
    padding-left:0;
`;
const TaskLi= styled.li`
    margin: 1rem 1rem 1rem 1rem;
    background: rgba(0, 25, 97, .3);
    color:white;
    font-size: 1rem;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    min-height:3vh;
    height:100%;
    transition: all 0.5s ease;  
    flex: 1;
`;

const Btns = styled.div`
    display:flex;
    flex-direction:row;
`;
const WeekBtns = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    height:30vh;
`;
const Btn = styled.button`
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

const Goals = (props) => {
    const init = async () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }   
    }

    useEffect(() => {    
        init();     
    }, []);

    const [week, setWeek] = useState(1);

    const deleted = (id) => {
        props.deleteGoal(id);
    }
    
    const renderGoalsList = (day, numWeek) => {
        let week = 0;
        if(numWeek === -1){
            week = -14
        }
        if(numWeek === 0){
            week = -7
        }
        if(numWeek === 1){
            week = 0
        }
        if(numWeek === 2){
            week = 7
        }
        if(numWeek === 3){
            week = 14
        }

        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentDayNo = currentDate.getDate();
        let currentDay = currentDayNo+week     
        let currentMonth = currentDate.getMonth();

        //Filter goals for current year
        const goalsByCurrentYear = props.goals.filter(function(goal){  
            //console.log(goal)        
            let goalYear = new Date(goal.date).getFullYear();
            //console.log(goalYear)
            return goalYear === currentYear;
        });
        
        //Filter goals for current month
        const goalsByCurrentMonth = goalsByCurrentYear.filter(function(goal){     
            //console.log(goal)     
            const goalMonth = new Date(goal.date).getMonth();
            //console.log(goalMonth)
            return goalMonth === currentMonth;
        });
        
        //Filter goals for specified day
        const goalsByCurrentDay = goalsByCurrentMonth.filter(function(goal){
            const goalDay = new Date(goal.date).getDay();
            // siendo x la semana a averiguar x*7 - dia en el que empieza el mes, 0-6
            // ej 1-1 * 7 - 0
            //console.log(goal)
            return goalDay === day;
        });
        
        const filteredGoals = [];
        
        let current = new Date(currentYear, currentMonth, currentDay);     // get current date    
        let weekstart = current.getDate() - current.getDay() +1;    
        let weekend = weekstart + 6;       // end day is the first day + 6 
        let monday = new Date(current.setDate(weekstart));  
        let sunday = new Date(current.setDate(weekend));    
        
        //Filter goals for specific week.
        goalsByCurrentDay.forEach(goal => {
            const goalDay = new Date(goal.date).getDate();
            if(goalDay >= monday.getDate() && goalDay <= sunday.getDate()){
                filteredGoals.push(goal)
            }
        });

        //Finally, render goals that got left.
        return filteredGoals.map(goal=>{
            let day = new Date(goal.date).getDay(); 
            let month = new Date(goal.date).getMonth(); 
            let hours = new Date(goal.deadline).getHours();
            let minutes = new Date(goal.deadline).getMinutes();
            return (
                <TaskLi key={goal._id}>
                    {goal.title}
                    <br/>
                    {goal.details}
                    <br/>
                    {day+" "+month}
                    <br/>
                    {hours+":"+minutes}
                    <Btns>                        
                        <Btn onClick={()=> deleted(goal._id)}>Delete</Btn>
                    </Btns>
                </TaskLi>
            )
        });
         
    }

    const onSubmit = (formValues) => {       
        if(formValues.deadline){
            let time = formValues.deadline;
            formValues.deadline = formValues.date +" "+ time;
        }    
        if(!formValues.deadline){
            formValues.deadline = null
        } 
        props.createGoal({ ...formValues, aId: props.currentActivity});  
    }
    
    return(       
        <React.Fragment>                           
            <WorkWrapper>
            <WNavigation/>                   
                <Tasks>
                    <TasksLists> 
                        <TaskUl>
                            Monday
                            {renderGoalsList(1,week)}
                        </TaskUl> 
                        <TaskUl>
                            Tuesday
                            {renderGoalsList(2,week)}
                        </TaskUl> 
                        <TaskUl>
                            Wednesday
                            {renderGoalsList(3,week)}
                        </TaskUl> 
                        <TaskUl>
                            Thursday
                            {renderGoalsList(4,week)}
                        </TaskUl> 
                        <TaskUl>
                            Friday
                            {renderGoalsList(5,week)}
                        </TaskUl> 
                        <TaskUl>
                            Saturday
                            {renderGoalsList(6,week)}
                        </TaskUl>
                        <TaskUl>
                            Sunday
                            {renderGoalsList(0,week)}
                        </TaskUl>  
                    </TasksLists>
                    <WeekBtns>
                        <Btn onClick={()=>setWeek(week-1)}>Prev</Btn>
                        <Btn onClick={()=>setWeek(week+1)}>Next</Btn>
                    </WeekBtns>         
                </Tasks>               
                    <FormContainer>          
                        <NewGoalForm onSubmit={onSubmit}/>
                    </FormContainer> 
            </WorkWrapper>
            <WorkspaceFooter/>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,   
        goals: Object.values(state.goal), 
        empty: state.activity.activitiesAreEmpty,
        currentActivity: state.activity.currentActivity
    }
}
export default connect(mapStateToProps, { fetchGoals, deleteGoal, createGoal })(Goals);