import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NewErrandForm from './pages/NewErrandForm';
import Signup from './pages/Signup';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/new-errand'>
          <NewErrandForm />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;