import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import styled from 'styled-components'

import history from '../../history';
import moment from 'moment';

const ChartSpace = styled.div`
    height:100%;
    width: 95%;
    margin: auto;
    padding:1vh 1vh;
    position:relative;
    z-index:1;
`

const Chart = (props) => {
    const [week, setWeek] = useState(0);
    //const [sessionsAreLoaded, setSessionsAreLoaded] = useState(0)
    const [chartData, setChartData] = useState({})

    const startDay = moment().subtract(week, 'weeks').startOf('isoWeek').format();

    const endDay = moment().subtract(week, 'weeks').endOf('isoWeek').format();

    const init = () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }            
    }
    
    useEffect(() => {    
        init(); 
        prepareData()       
    }, [week]);

    let sessionNumHrs = [];
    const prepareData = () => {
        //Fix hours addition for repeated day
        let numHrsMonday = 0;
        let numHrsTuesday = 0;
        let numHrsWednesday = 0;
        let numHrsThursday = 0;
        let numHrsFriday = 0;
        let numHrsSaturday = 0;
        let numHrsSunday = 0;

        if(sessionNumHrs.length === 0){
            props.sessions.forEach(session => {           
                const sessionDay = moment.utc(session.date).format('dddd')
                console.log(sessionDay)
                switch(sessionDay){
                    case 'Monday':
                        numHrsMonday =+ session.numHrs
                        break;
                    case 'Tuesday':
                        numHrsTuesday =+ session.numHrs
                        break;
                    case 'Wednesday':
                        numHrsWednesday =+ session.numHrs
                        break;
                    case 'Thursday':
                        numHrsThursday =+ session.numHrs
                        break;
                    case 'Friday':
                        numHrsFriday =+ session.numHrs
                        break;
                    case 'Saturday':
                        numHrsSaturday =+ session.numHrs
                        break;
                    case 'Sunday':
                        numHrsSunday =+ session.numHrs
                        break;
                    default:
                        console.log("---");
                }
                console.log(numHrsSaturday)
            });
        }
        sessionNumHrs.push(numHrsMonday);
        sessionNumHrs.push(numHrsTuesday);
        sessionNumHrs.push(numHrsWednesday);
        sessionNumHrs.push(numHrsThursday);
        sessionNumHrs.push(numHrsFriday);
        sessionNumHrs.push(numHrsSaturday);
        sessionNumHrs.push(numHrsSunday);
        console.log(sessionNumHrs)
        setChartData(
            {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets:[
                  {
                    label:'Hours',
                    data:sessionNumHrs,
                    backgroundColor:[
                      '#0099E0',
                      '#0099E0',
                      '#0099E0',
                      '#0099E0',
                      '#0099E0',
                      '#0989E0',
                      '#0989E0',
                    ]
                  }
                ]
              }
        )
    }

    return(

                    <ChartSpace>
                        <Bar
                            data={chartData}
                            options={{
                                title:{
                                    display:false,
                                },
                                legend:{
                                    display:false,
                                },                               
                                scales: {
                                    xAxes: [{
                                      display: true,
                                      gridLines: {
                                        display: true,
                                        color: "#CCC"
                                      },
                                      ticks: {
                                        fontColor: "#CCC", // this here
                                      },
                                    }],
                                    yAxes: [{
                                      display: true,
                                      gridLines: {
                                        display: true,
                                        color: "#CCC"
                                      },
                                      ticks: {
                                        fontColor: "#CCC", // this here
                                      },                                     
                                    }]
                                  }
                            }}
                        />
                    </ChartSpace>

    )
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.user.isSignedIn,   
        sessions: Object.values(state.session), 
        empty: state.activity.activitiesAreEmpty,
        currentActivity: state.activity.currentActivity
    }
}

export default connect(mapStateToProps)(Chart);