import { UserContextProvider } from './contexts/user';
import { Home, Profile } from './pages';
import { Navbar } from './containers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <UserContextProvider >
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/:username" children={<Profile />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </UserContextProvider>
  );
}

export default App;
