import React from "react";
import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/Home/Home';
import CountryDetail from "./components/CountryDetail/CountryDetail";
import CreateTour from "./components/CreateTour/CreateTour";


function App() {
  return (
     <div className="App">
      <h1>Henry Countries</h1>
      <Route exact path={"/countries"} component = {Home}/>
      <Route exact path={"/countries/:id"} component = {CountryDetail}/>
      <Route exact path={"/activities/create"} component = {CreateTour}/>
    </div> 
  );
}

export default App;
