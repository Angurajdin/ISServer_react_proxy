import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AddProxyServer from './Components/AddProxyServer';
import './App.css';
import Home from './Components/Home';


function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path={["/", "/signup"]}> */}
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/addProxy">
          <AddProxyServer/>
        </Route>
        <Route path="*">
          <h2>404, Page not found</h2>
          <Link to="/">Back to Login Page</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
