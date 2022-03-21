import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import AddProxyServer from './Components/ProxyServer/AddProxyServer';
import Proxy from './Components/ProxyServer/ProxyServer';
import EditProxyServer from './Components/ProxyServer/EditProxyServer';
import AddRemoteServer from './Components/RemoteServer/AddRemoteServer';
import Remote from './Components/RemoteServer/RemoteServer';
import EditRemoteServer from './Components/RemoteServer/EditRemoteServer';
import SFTP from './Components/SFTP/SFTP';
import AddSFTP from './Components/SFTP/AddSFTP';
import EditSFTP from './Components/SFTP/EditSFTP';
import Home from './Components/Home';
import License from './Components/Server/Licensing/License';
import Statistics from './Components/Server/Statistics/Statistics';
import LicenseDetails from './Components/Server/Licensing/LicenseDetails';
import Overview from './Components/Dashboard/Overview';
import SFTPUser from './Components/SFTP/User/SFTPUser';
import AddSFTPUser from './Components/SFTP/User/AddSFTPUser';
import EditSFTPUser from './Components/SFTP/User/EditSFTPUser';



function App() {

  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path={["/", "/signup"]}> */}
          <Route exact path={["/", "/dashboard"]}>
            <Overview/>
          </Route>

          <Route exact path="/proxyServer/">
            <Proxy/>
          </Route>
          <Route exact path="/proxyServer/addProxy">
            <AddProxyServer/>
          </Route>
          <Route exact path="/proxyServer/editProxy">
            <EditProxyServer/>
          </Route>
          
          <Route exact path="/remoteServer/">
            <Remote/>
          </Route>
          <Route exact path="/remoteServer/addRemote">
            <AddRemoteServer/>
          </Route>
          <Route exact path="/remoteServer/editRemote">
            <EditRemoteServer/>
          </Route>
          
          <Route exact path="/SFTP/">
            <SFTP/>
          </Route>
          <Route exact path="/SFTP/addSFTP">
            <AddSFTP/>
          </Route>
          <Route exact path="/SFTP/editSFTP">
            <EditSFTP/>
          </Route>

          <Route exact path="/SFTP/UserAlias">
            <SFTPUser/>
          </Route>
          <Route exact path="/SFTP/addSFTPUser">
            <AddSFTPUser/>
          </Route>
          <Route exact path="/SFTP/editSFTPUser">
            <EditSFTPUser/>
          </Route>

          <Route exact path="/server/license/">
            <License/>
          </Route>
          <Route exact path="/server/licenseDetails/">
            <LicenseDetails/>
          </Route>
          <Route exact path="/server/statistics">
            <Statistics/>
          </Route>
          
          
          <Route path="*">
            <h2>404, Page not found</h2>
            <Link to="/">Back to Login Page</Link>
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
