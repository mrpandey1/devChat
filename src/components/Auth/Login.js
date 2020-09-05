import React from 'react';
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react';
import {Link } from 'react-router-dom';
import firebase from '../../firebase';
class Login extends React.Component{

    state={
        email:'',
        password:'', 
        errors:'',
        loading:false,
    }
    handleChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    displayErrors=errors=> errors.map((error,i)=><p key={i}>{error.message}</p>);
    
    handleSubmit=event=>{
        if(this.isFormValid(this.state)){
            this.setState({errors:[],loading:true})
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signInUser=>{
                console.log(signInUser)
                this.setState({
                    error:[],loading:false
                })
            }).catch(err=>{
                console.log(err);
                this.setState({
                    errors:this.state.errors.concat(err),loading:false
                })
            })
        }
    }
    isFormValid=({email,password})=> email && password;
    render(){
        const {loading,password,email,errors}=this.state;
        return(
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{maxWidth:450}}>
                    <Header as='h2' icon color='violet' textAlign='center'>
                    <Icon name='code branch' color='violet'/>
                    Login to devChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>  
                            <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email address' value={email} onChange={this.handleChange} type='email'/>
                            <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' onChange={this.handleChange} value={password} type='password'/>
                             <Button disabled={loading} className={loading?'loading':''} color='violet' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length>0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Register ?<Link to='/register'> Register </Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;