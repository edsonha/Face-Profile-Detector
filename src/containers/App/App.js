import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Logo from '../../components/Logo/Logo';
import Navigation from '../../components/Navigation';
import SignIn from '../../components/SignIn';
import Register from '../../components/Register';
import Home from '../Home/Home';
import './App.css';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  signInAction,
  signOutAction
} from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.signInReducer.isSignedIn
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSignIn: () => dispatch(signInAction()),
  onSignOut: () => dispatch(signOutAction())
})

const particlesOptions ={
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  render() {
    const { isSignedIn, onSignIn, onSignOut } = this.props;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onSignOut={onSignOut} />
        <Switch>          
          <Route exact path='/' render={() => <Redirect to='/sign-in' />} />
          <Route exact path='/sign-in' render={() => 
            <div>
              <Logo />
              <SignIn onSignIn={onSignIn} />
            </div>
          }/>
          <Route exact path='/register' render={() => 
            <div>
              <Logo />
              <Register onSignIn={onSignIn} />
            </div>
          }/>
          <Route exact path='/home' render={() => <Home />} />
        </Switch>  
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));