import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteActivity } from '../../actions';
import { Wrapper, Title, MainBtn, FormContainer} from '../../styledcomponents';
import Navigation from '../Navigation';
import history from '../../history';

const ListActivities = (props) => {
    const init = async () =>{
        if(!props.isSignedIn){
          history.push('/signIn')
        }           
    }

    useEffect(() => {    
        init();     
    }, []);
    
    const deleted = () => {
        const parameters = [props.match.params.id, props.currentUserID]
        props.deleteActivity(props.match.params.id);
    }
    return(
        <React.Fragment>
            <Navigation/>
            <Wrapper>  
                <div className = "ui container">   
                    <Title>Are you sure you want to delete this activity?</Title>
                    <FormContainer>
                        <MainBtn onClick={()=> deleted()}>Delete</MainBtn>   
                        <Link to ='/activities'><MainBtn>Back</MainBtn></Link>
                    </FormContainer>
                    
                </div>             
            </Wrapper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        activities: Object.values(state.activity),
        isSignedIn: state.user.isSignedIn,
        currentUserID: state.user.userInfo._id
    }
}

export default connect(mapStateToProps, { deleteActivity })(ListActivities);