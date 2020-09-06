import React, { Component } from 'react';
import './App.css';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';

const App=({currentUser})=>(
 <Grid columns='equal' className='app' style={{background:'#eee'}}>
   <ColorPanel/>
   <SidePanel currentUser={currentUser}/>

   <Grid.Column style={{marginLeft:320}}>
    <Messages/>
   </Grid.Column>
   
   <Grid.Column width={4}>
     <MetaPanel/>
   </Grid.Column>
 </Grid>
)

const mapStateToProps=state=>({
  currentUser:state.user.currentUser,
})
export default connect(mapStateToProps)(App);
