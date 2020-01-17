import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './Home';
import SearchResults from './SearchResults';
import EventPage from './EventPage';



class LogicContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginBtn: JSON.parse(localStorage.getItem('showLoginBtn')) || false,


    };
  }


 

  hideLoginBtns = () => {
    if (localStorage.token) {
      this.setState({
        showLoginBtn: true
      }, () => {
        localStorage.setItem('showLoginBtn', JSON.stringify(this.state.showLoginBtn))
      })
    }
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      showLoginBtn: false
    })
  }


  render() {
    return (

      <BrowserRouter>

        <NavBar showLoginBtnState={this.state.showLoginBtn} logout={this.logout} hideLoginBtns={this.hideLoginBtns}/>

        <Switch>

          <Route exact path='/' component={(history) => <Home
            history={history}
          />}
          />

          <Route exact path='/signup' component={(history) => <SignUp
            history={history}
          />}
          />

          <Route exact path='/login' component={(history) => <Login
            history={history}  hideLoginBtns={this.hideLoginBtns}
          />}
          />

          <Route exact path='/search-results' component={(history) => <SearchResults
            history={history}
          />}
          />

          <Route exact path='/event-page' component={(history) => <EventPage
            history={history}
          />}
          />


        </Switch>

        <Footer />

      </BrowserRouter>

    );
  }
}

export default LogicContainer;
