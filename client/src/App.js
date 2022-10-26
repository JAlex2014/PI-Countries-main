import React from "react";
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import Home from './components/Home/Home';
import Activities from './components/Activities/Activities'
import CountryDetail from "./components/CountryDetail/CountryDetail";
import CreateTour from "./components/CreateTour/CreateTour";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path={"/"} component ={LandingPage}/>
          <Route path={"/"} component={Nav}/>
        </Switch>
          <Route exact path={"/countries"} component = {Home}/>
          <Route exact path={"/activities"} component = {Activities}/>
          <Route exact path={"/countries/:id"} component = {CountryDetail}/>
          <Route exact path={"/activities/create"} component = {CreateTour}/>
      </div> 
  );
}
export default App;
