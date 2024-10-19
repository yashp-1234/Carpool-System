import "./App.css";
import {Route} from 'react-router-dom'
import Homepage from "./Pages/Homepage";
import Formpage from "./Pages/Formpage";
import Mainpage from "./Pages/Mainpage";

function App() {
  return (
    <div className="App">
      <Route path='/'component = {Homepage} exact/>
      <Route path='/form'component = {Formpage} exact/>
      <Route path='/main' component = {Mainpage} exact/>
    </div>
  );
}

export default App;
