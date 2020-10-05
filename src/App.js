import React from 'react';
import Movies from './components/Movies';
import Navbars from './components/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import About from './components/About';
import Series from './components/Series'
import Home from './components/Home';
import Details from './components/Details';


function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
          {/* <Navbars /> */}
          <Route path='/' component={Navbars}></Route>
          <Switch>
            <Route exact path='/' component={Home}></Route> 
            <Route path='/movies' component={Movies}></Route>
            <Route path='/series' component={Series}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/:type/:id' component={Details}></Route>
            
          </Switch>
          </header>
        </div>
    </BrowserRouter>
    
  );
}

export default App;
