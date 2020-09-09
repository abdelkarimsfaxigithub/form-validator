import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainView1 from "./components/MainView1";
import MainView2 from "./components/MainView2";
import { BACK_URL } from "./configuration/config";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async getFormDataV1() {
    await axios
      .get(`${BACK_URL}/V1/get/form`)
      .then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ data1: res.data });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  async getFormDataV2() {
    await axios
      .get(`${BACK_URL}/v2/get/form`)
      .then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ data2: res.data });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  componentDidMount() {
    this.getFormDataV1();
    this.getFormDataV2();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <MainView1 data={this.state.data1} />}
          />
          <Route
            path="/v2"
            component={() => <MainView2 data={this.state.data2} />}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
