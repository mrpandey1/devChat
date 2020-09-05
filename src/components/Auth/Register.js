import React from 'react';
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react';
import {Link } from 'react-router-dom';
import firebase from '../../firebase';
class Register extends React.Component{

    state={
        username:'',
        email:'',
        password:'', 
        passwordConfirmation:'',
        errors:'',
        loading:false
    }
    handleChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    isFormValid=()=>{
        let errors=[];
        let error;
        if(this.isFormEmpty(this.state)){
            error=  {message:'Fill in all fields'};
            this.setState({errors:errors.concat(error)})
            return  false;
        }else if(!this.isPasswordValid(this.state)){
            error={message:'Password is invalid'}
            this.setState({errors:errors.concat(error)});
            return false;
        }else{
            return true;
        }
    }
    isPasswordValid=({ password,passwordConfirmation})=>{
        if(password.length<6 || passwordConfirmation.length<6){
            return false ;
        }
        else if (password!==passwordConfirmation){
            return false;
        }else{
            return true;
        }
    }

    isFormEmpty=({username,email,password,passwordConfirmation})=>{
        return !username.length ||!email.length ||!password.length || !passwordConfirmation.length
    }

    displayErrors=errors=> errors.map((error,i)=><p key={i}>{error.message}</p>);

    handleSubmit=event=>{
        if(this.isFormValid()){
            this.setState({errors:[],loading:true})
            event.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
                createdUser=>{
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName:this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    }).then(()=>{
                        this.setState({loading:false});
                    }).catch(err=>{
                        console.log(err);
                        this.setState({errors:this.state.errors.concat(err),loading:false})
                    })
                }
            ).catch(err=>{
                console.log(err)
                this.setState({errors:this.state.errors.concat(err),loading:false});
            });
        }
    }
    render(){
        const {loading,username,password,email,passwordConfirmation,errors}=this.state;
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
                        
                            <Button disabled={loading} className={loading?'loading':''} color='orange' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length>0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already registered ?<Link to='/login'> Login </Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;