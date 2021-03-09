import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Banner />
        <Switch>
          <Route path="/search" component={Search} exact />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
