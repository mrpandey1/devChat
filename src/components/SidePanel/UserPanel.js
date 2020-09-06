import React from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

class UserPanel extends React.Component{
state={
    user:this.props.currentUser
}
    dropDownOptions=()=>[
        {
            key:'user',
            text:<span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled:true
        },
        {
            key:'avatar',
            text:<span>Change avatar</span>
        },
        {
            key:'signOut',
            text:<span onClick={this.handleSignout}>Sign Out</span>
        }

    ]
    handleSignout=()=>{
        firebase
        .auth()
        .signOut().then(()=>console.log('Sign out'));
    }
    render(){
        console.log(this.props.currentUser); 
        return(
            <Grid style={{background:'#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{padding:'1.2em',margin:0}}>
                        
                        <Header inverted floated='left' as='h2'>
                            <Icon name='code'/>
                            <Header.Content>
                                DevChat
                            </Header.Content>
                        </Header>
                    </Grid.Row>
                    {/* UserDropDown */}
                     <Header style={{padding:'0.25em'}} as='h4' inverted>
                         <Dropdown trigger={
                             <span>{this.state.user.displayName}</span>
                         } options={this.dropDownOptions()}/>
                     </Header>
                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel;