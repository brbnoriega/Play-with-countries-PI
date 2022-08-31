import {BrowserRouter , Route, Switch} from "react-router-dom";
import Home from '../src/Home/Home.jsx'
import LandingPage from '../src/LandingPage/LandingPage.jsx';
import ActivitiesCreate from "./Form/Form.jsx";
import Detail from './Detail/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={LandingPage}/> 
          <Route path= '/home' component={Home}/> 
          <Route path= '/activities' component={ActivitiesCreate}/> 
          <Route path='/countries/:id' component={Detail}/>
      </Switch>
    </BrowserRouter> 
  );
}

export default App;
