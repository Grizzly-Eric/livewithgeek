'use strict';

import React from 'react' ;
import ReactDOM from 'react-dom' ;

import Main       from './modules/Main/Main' ;
import MainPage   from './modules/MainPage/MainPage' ;
import Register   from './modules/Register/Register' ;
import Login      from './modules/Login/Login' ;
import Homesource from './modules/Homesource/Homesource' ;
import Teamholl   from './modules/Teamholl/Teamholl' ;
import Teamchild  from './modules/Teamchild/Teamchild' ;
import Homelist   from './modules/Homelist/Homelist' ;
import Addteam    from './modules/Addteam/Addteam' ;

import { Router , Route , Link , IndexRoute , hashHistory } from 'react-router' ;

class Team extends React.Component {
    render(){
      return (
        <div>
          {this.props.children}
        </div>)
    }
}

class House extends React.Component {
    render(){
      return (
        <div>
          {this.props.children}
        </div>)
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={MainPage} />
        <Route path='Login'      component={Login}></Route>
        <Route path='Register'   component={Register}></Route>
        <Route path='Homesource' component={Homesource}></Route>
        <Route path='Team'   component={Team}>
          <IndexRoute component={Teamholl} />
          <Route path='Addteam' component={Addteam}></Route>
          <Route path=':id' component={Teamchild}></Route>
        </Route>
        <Route path='Addteam'    component={Addteam}></Route>
        <Route path='Homelist'   component={Homelist}></Route>
      </Route>
    </Router>
    ),
    document.getElementById('GeekApp'),
    function(){
        console.log('Live with Geek give you better life!');
    }
);
