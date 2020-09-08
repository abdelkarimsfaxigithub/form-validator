import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainView from "./components/MainView";
import axios from "axios";
import { BACK_URL } from "./configuration/config";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async getFormData() {
    await axios
      .get(`${BACK_URL}/get/form`)
      .then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ data: res.data });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  componentDidMount() {
    this.getFormData();
  }

  render() {
    return (
      <div>
        <Header />
        <MainView data={this.state.data} />
        <Footer />
      </div>
    );
  }
}

export default App;
