import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function App() {
  const [{user}] = useStateValue();
  return (
    <div className="App">
      <div className="app_body">
      {!user?
        <Login/>:
        <Router>
        <Sidebar />
          <Switch>
            <Route path="/names/:nameId">
            <Chat />
            </Route>
            <Route path="/">
            <Chat />
            </Route>
          </Switch>
        </Router>}
      </div>
    </div>
  );
}

export default App;
