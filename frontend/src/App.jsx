import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home.jsx";
import { Routes, Route } from "react-router-dom";
import View from "./components/View";
import OperatorForm from "./components/OperatorForm.jsx";
import UpdateOperator from "./components/UpdateOperator.jsx";
import Login from "./components/Login.jsx";
import TopBar from "./components/TopBar.jsx";
import Logout from "./components/Logout.jsx";
import { Provider } from "react-redux";
import {store} from "./redux/store.js";

function App() {
  return (
    <div>
      <Provider store={store}>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/view/:id" element={<View />} />
        <Route exact path="/add" element={<OperatorForm />} />
        <Route exact path="/edit/:id" element={<UpdateOperator />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
      </Routes>
      </Provider>
    </div>
  );
}

export default App;
