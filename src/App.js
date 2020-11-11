import './App.css';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={UserList} />
          <Route path="/users/:id" component={UserDetail} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
