import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteGoal, createGoal, fetchGoals } from '../../actions';
import history from '../../history';

const Tasks = styled.section`
    min-height:40vh;
    height:100%;
    width: 100%;
    display:flex;
    flex-direction:row;
    margin: auto;
    padding:1vh 1vh 1vh 1vh;
    position:relative;
    z-index:1;
    align-items: center;
    justify-content: center;
`;
const TasksLists = styled.div` 
    display:flex;
    flex-direction:row;
    min-height:10vh;
    height:100%;
    width:90%;
    margin:auto;
`;
const TaskListContainer = styled.div`
    width:100%;
    height:100%;
`;
const Title = styled.h1`
    font-size:2rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding:.5vh .5vh;
`;
const Day = styled.h3`
    font-size:1rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
`;
const TaskUl = styled.ul`
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

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentDayNo = currentDate.getDate();

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

let _currentMonth = months[currentMonth];

const SmallGoals = (props) => {

    const [week, setWeek] = useState(1);
    const [month, setMonth] = useState(1);

    const init = async () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }   
    }

    useEffect(() => {    
        init();     
    }, []);

    const deleted = (id) => {
        props.deleteGoal(id);
    }
    
    const renderGoalsList = (day, week, numMonth) => {
        let numWeek = 0;
        if(week === -1){
            numWeek = -14
        }
        if(week === 0){
            numWeek = -7
        }
        if(week === 1){
            numWeek = 0
        }
        if(week === 2){
           numWeek = 7
        }
        if(week === 3){
            numWeek = 14
        }
        let currentDay = currentDayNo
        if(currentDayNo+numWeek < 31){
            currentDay = currentDayNo + numWeek;          
            console.log(currentDay) 
        }else{
            console.log("no hace nada")
        }
        let current = new Date(currentYear, currentMonth, currentDay);     // get current date    
        let weekstart = current.getDate() - current.getDay() +1;    
        let weekend = weekstart + 6;       // end day is the first day + 6 
        let monday = new Date(current.setDate(weekstart));  
        let sunday = new Date(current.setDate(weekend));    

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
      
        //Filter goals for specific week.
        goalsByCurrentDay.forEach(goal => {
            const goalDay = new Date(goal.date).getDate();
            if(goalDay >= monday.getDate() && goalDay <= sunday.getDate()){
                filteredGoals.push(goal)
            }
        });

        //Finally, render goals that got left.
        return filteredGoals.slice(0, 4).map(goal=>{
            
            let _day = new Date(goal.date).getDate();
            //let _month = new Date(goal.date).getMonth(); 
           // let month = _month +1;
            //let hours = new Date(goal.deadline).getHours();
           // let minutes = new Date(goal.deadline).getMinutes();
            
            return (               
                <TaskLi key={goal._id}>
                    <p>Day {_day}</p>
                    {goal.title}
                    <hr/>
                    {goal.details}
                    <hr/>
                    <Btns>                        
                        <Btn onClick={()=> deleted(goal._id)}>Delete</Btn>
                    </Btns>
                </TaskLi>
            )
        });
         
    }
    /*
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
    */
    return(       
        <React.Fragment>                           
                <Title>{_currentMonth+" "+currentYear}</Title> 
                <Tasks>
                    <TasksLists> 
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Monday</Day> 
                                {renderGoalsList(1,week,month)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Tuesday</Day>
                                {renderGoalsList(2,week,month)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Wednesday</Day>
                                {renderGoalsList(3,week,month)}
                            </TaskUl> 
                        </TaskListContainer> 
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Thursday</Day>
                                {renderGoalsList(4,week,month)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Friday</Day>
                                {renderGoalsList(5,week,month)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Saturday</Day>
                                {renderGoalsList(6,week,month)}
                            </TaskUl> 
                        </TaskListContainer>
                        <TaskListContainer>
                            <TaskUl>
                                <Day>Sunday</Day>
                                {renderGoalsList(0,week,month)}
                            </TaskUl> 
                        </TaskListContainer>
                    </TasksLists>
                    <WeekBtns>
                        <Btn 
                            onClick={
                                ()=>{
                                    if(month===1){
                                        console.log("prev")
                                        setWeek(week-1);
                                        console.log(week)
                                    }
                                }
                            }
                        >
                            Prev
                        </Btn>
                        <Btn 
                            onClick={
                                ()=>{
                                    if(month===1){
                                        console.log("next")
                                        setWeek(week+1);
                                        console.log(week)
                                    }
                                }
                            }
                        >
                            Next
                        </Btn>
                    </WeekBtns>         
                </Tasks>                          
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
export default connect(mapStateToProps, { fetchGoals, deleteGoal, createGoal })(SmallGoals);