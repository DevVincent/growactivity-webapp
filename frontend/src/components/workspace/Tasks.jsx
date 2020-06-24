import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { deleteGoal, createGoal, fetchGoals, fetchGoalsByWeek, addDeadline } from '../../actions';
import { STasks, TasksLists, TaskListContainer, Title, Day, DayContainer, TaskUl, Btns, WeekBtns, Btn, Spacer} from './TasksStyles'
import styled from 'styled-components'

import TaskForm0 from '../forms/taskForms/TaskForm0'
import TaskForm1 from '../forms/taskForms/TaskForm1'
import TaskForm2 from '../forms/taskForms/TaskForm2'
import TaskForm3 from '../forms/taskForms/TaskForm3'
import TaskForm4 from '../forms/taskForms/TaskForm4'
import TaskForm5 from '../forms/taskForms/TaskForm5'
import TaskForm6 from '../forms/taskForms/TaskForm6'
import DeadlineForm from '../forms/taskForms/DeadlineForm'

import history from '../../history';
import moment from 'moment'

const TaskLi= styled.li`
    margin: .5rem .5rem;
    background: rgba(0, 25, 97, .3);
    color:white;
    font-size: 1rem;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    min-height:6vh;
    height:100%;
    transition: all 0.5s ease;  
    flex: 1;
`;

const Tasks = (props) => {
    const [week, setWeek] = useState(0);

    const currentMonth = moment().subtract(week, 'weeks').endOf('isoWeek').format();
    const _currentMonth = new Date(currentMonth).getMonth();

    const __currentYear = new Date(currentMonth).getFullYear();

    const startDay = moment().subtract(week, 'weeks').startOf('isoWeek').format();
    const _monday = new Date(startDay);
    
    const tuesday = moment().subtract(week, 'weeks').startOf('isoWeek').add(1, 'day').format();
    const _tuesday = new Date(tuesday)
    const wednesday = moment().subtract(week, 'weeks').startOf('isoWeek').add(2, 'day').format();
    const _wednesday = new Date(wednesday)
    const thursday = moment().subtract(week, 'weeks').startOf('isoWeek').add(3, 'day').format();
    const _thrusday = new Date(thursday)
    const friday = moment().subtract(week, 'weeks').startOf('isoWeek').add(4, 'day').format();
    const _friday = new Date(friday)
    const saturday = moment().subtract(week, 'weeks').startOf('isoWeek').add(5, 'day').format();
    const _saturday = new Date(saturday)

    const endDay = moment().subtract(week, 'weeks').endOf('isoWeek').format();
    const _sunday = new Date(endDay)

    const handleGoalsByWeek = () => {  
        const id = props.currentActivity
        const values = {id:id, startWeek:startDay, endWeek:endDay};
        if(id !== null){
            props.fetchGoalsByWeek(values) 
        }else{
            console.log("Error, ID is null.")
        }
    }
  
    const init = () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }   
        handleGoalsByWeek()
    }

    useEffect(() => {    
        init();     
    }, [week]);

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

    const onSubmitDeadline = (formValues) => {   
        const { date, time } = formValues      
        
        const dMonth = new Date(date).getMonth()+1;
        const dDay = new Date(date).getDate();
        const dYear = new Date(date).getFullYear();
        const dDate = dYear + "-" + dMonth + "-" + dDay      
        const mDate = moment(dDate+ ' '+ time).format()
        //console.log(time)
        props.addDeadline({ ...formValues, mDate });   
    }
    
    const deleted = (id) => {
        props.deleteGoal(id);
    } 

    const renderMonth = () => {
        let months = new Array();
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        let __currentMonth = months[_currentMonth];
        return __currentMonth + " " + __currentYear
    }
    const renderGoalsList = (day) => {
        
        //Filter goals for specified day
        const filteredGoals =  props.goals.filter(function(goal){
            const goalDay = new Date(goal.date).getDay();
            return goalDay === day;
        });

        //Finally, render goals that got left.
        return filteredGoals.map(goal=>{
            
            let _day = new Date(goal.date).getDate();
            //<DeadlineForm onSubmit={onSubmitDeadline} Id={goal._id} date={goal.date}/>
            return ( 
                <React.Fragment>            
                <TaskLi key={goal._id}>         
                    {goal.title}
                    <hr/>
                    {goal.details}
                    <hr/>         
                    
                    <Btns>                        
                        <Btn onClick={()=> deleted(goal._id)}>Delete</Btn>
                    </Btns>
                </TaskLi>        
                </React.Fragment>
            )
        }); 
             
    }
    return(       
        <React.Fragment>                           
            <Title>{renderMonth()}</Title> 
                <STasks>
                    <TasksLists> 
                        <TaskListContainer>
                            <DayContainer><Day>Monday {_monday.getDate()}</Day></DayContainer>
                            <TaskUl>
                                <TaskForm1 onSubmit={onSubmit} date={_monday}/> 
                                {renderGoalsList(1)}
                            </TaskUl>
                        </TaskListContainer>
                        <TaskListContainer>
                            <DayContainer><Day>Tuesday {_tuesday.getDate()}</Day></DayContainer>
                            <TaskUl>
                                <TaskForm2 onSubmit={onSubmit} date={_tuesday}/> 
                                {renderGoalsList(2)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <DayContainer><Day>Wednesday {_wednesday.getDate()}</Day></DayContainer>    
                            <TaskUl>
                                <TaskForm3 onSubmit={onSubmit} date={_wednesday}/> 
                                {renderGoalsList(3)}
                            </TaskUl> 
                        </TaskListContainer> 
                        <TaskListContainer>
                            <DayContainer><Day>Thursday {_thrusday.getDate()}</Day></DayContainer>
                            <TaskUl>
                                <TaskForm4 onSubmit={onSubmit} date={_thrusday}/> 
                                {renderGoalsList(4)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <DayContainer><Day>Friday {_friday.getDate()}</Day></DayContainer>
                            <TaskUl>
                                <TaskForm5 onSubmit={onSubmit} date={_friday}/> 
                                {renderGoalsList(5)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <DayContainer><Day>Saturday {_saturday.getDate()}</Day></DayContainer>
                            <TaskUl>
                                <TaskForm6 onSubmit={onSubmit} date={_saturday}/> 
                                {renderGoalsList(6)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <DayContainer><Day>Sunday {_sunday.getDate()}</Day></DayContainer>    
                            <TaskUl>
                                <TaskForm0 onSubmit={onSubmit} date={_sunday}/> 
                                {renderGoalsList(0)}                             
                            </TaskUl> 
                        </TaskListContainer>              
                    </TasksLists>           
                </STasks>   
                    <WeekBtns>
                        <Btn onClick = {() => {setWeek(week + 1)}}>
                            Prev
                        </Btn>
                        <Spacer/>
                        <Btn onClick = {() => {setWeek(week - 1)}}>
                            Next
                        </Btn>
                    </WeekBtns>                         
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
export default connect(mapStateToProps, { fetchGoals, fetchGoalsByWeek, deleteGoal, createGoal, addDeadline })(Tasks);