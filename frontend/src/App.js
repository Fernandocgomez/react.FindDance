import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LogicContainer from './components/LogicContainer';



class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {


  };
}

 



  render() {
    console.log(this)
    
    return (
      <BrowserRouter>
      

        <Switch>
          
          <Route component={(history) => <LogicContainer history={history} />} />
          
        </Switch>
      
      </BrowserRouter>
    );
  }
}

export default App;
