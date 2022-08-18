import {BrowserRouter , Route, Switch} from "react-router-dom";
import Home from '../src/Home/Home.jsx'
import LandingPage from '../src/LandingPage/LandingPage.jsx';


function App() {
  return (
  


    <BrowserRouter>

      <Switch>
          <Route exact path='/' component={LandingPage}/> 
            <Route path='/home' component={Home}/> 
            
      </Switch>
   
    </BrowserRouter>

  );
}

export default App;
