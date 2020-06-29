import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import styled from 'styled-components'
import WorkspaceFooter from './WorkspaceFooter';
import WNavigation from './WNavigation';

import history from '../../history';
import moment from 'moment';

const WorkWrapper = styled.div`
    background:linear-gradient(90deg, #0099E0 0%, #001961 100%);
    position:relative;
    z-index:0;
    min-height: ${props => (props.home ? '65vh' : '95vh')};
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
const ChartSpace = styled.div`
    max-height:80vh;
    width: 80%;
    margin: auto;
    padding:10vh 1vh 1vh 1vh;
    position:relative;
    z-index:1;
`
const Title = styled.h1`
    font-size:3rem;
    text-align: center;
    margin:auto;
    width:80%;
    color: white;
    padding:.5vh 1vh;
    margin-bottom:2vh;
`;
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
        <React.Fragment>
            <WorkWrapper>
                <WNavigation/>
                <Content>
                    <Title>Activity Chart</Title>
                    
                    <ChartSpace>
                        <Bar
                            data={chartData}
                            options={{
                                title:{
                                    display:true,
                                    text:'Number of Hours per Day',
                                    fontColor:'#fff',
                                    fontSize:20
                                },
                                legend:{
                                    display:true,
                                    position:'right',
                                    labels:{
                                        fontColor:'#fff'
                                    }
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
                </Content>
            </WorkWrapper>
            <WorkspaceFooter/>
        </React.Fragment>
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