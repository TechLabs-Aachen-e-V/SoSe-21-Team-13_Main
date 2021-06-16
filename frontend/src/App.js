import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NewErrandForm from './pages/NewErrandForm';
import Signup from './pages/Signup';
import { AuthContextProvider } from './context/AuthContext';
import MyErrands from './pages/MyErrands';

function App() {
  return (
    <AuthContextProvider>
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
        <Route path='/my-errands'>
          <MyErrands />
        </Route>
      </Switch>
    </AuthContextProvider>
  );
}

export default App;