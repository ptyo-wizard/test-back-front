//import logo from './logo.svg';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import SellOrderList from "./components/SellOrderList";

import SellOrderDetails from "./components/SellOrderDetails";

import Form from "./components/Form";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={SellOrderList}></Route>
        <Route path="/details" component={SellOrderDetails}></Route>
        <Route path="/form2" component={Form}></Route>
      </Router>
    </Provider>
  );
}

export default App;
