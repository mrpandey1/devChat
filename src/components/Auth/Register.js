import React from 'react';
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react';
import {Link } from 'react-router-dom';
import firebase from '../../firebase';
class Register extends React.Component{

    state={
        username:'',
        email:'',
        password:'', 
        passwordConfirmation:''
    }
    handleChange=event=>{
        this.setState({[event.target.name]:event.target.value})
        };

        handleSubmit=event=>{
event.preventDefault();
 firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
     createdUser=>{
         console.log(createdUser)
     }
 ).catch(err=>{
     console.log(err)
 });
        }

    render(){
        const {username,password,email,passwordConfirmation}=this.state;
        return(
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{maxWidth:450}}>
                    <Header as='h2' icon color='orange' textAlign='center'>
                    <Icon name='puzzle piece' color='orange'/>
                    Register for devChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Username' value={username } onChange={this.handleChange} type='text'/>
                            
                            <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email address' value={email} onChange={this.handleChange} type='email'/>
                            
                            <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' onChange={this.handleChange} value={password} type='password'/>
                            
                            <Form.Input fluid name='passwordConfirmation' icon='repeat' iconPosition='left'
                            value={passwordConfirmation}  placeholder='Password Confirmation' onChange={this.handleChange} type='password'/>
                        
                            <Button color='orange' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already registered ?<Link to='/login'> Login </Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;