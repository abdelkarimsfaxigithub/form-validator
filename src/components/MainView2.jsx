import React, { Component } from "react";
import axios from "axios";

import Error from "./ErrorMessages";
import Success from "./SuccessMessages";
import { BACK_URL } from "../configuration/config";

export class MainViewV2 extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      shouldRedirect: false,
      error: [],
      data: {},
      date: []
    };
  }
  componentDidMount() {
    this.state.date.forEach(el => {
      const element = document.getElementById(el.e);
      element.value = el.d;
    });
  }
  getDate(date, e) {
    const d = new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    this.state.date.push({
      e: e,
      d: `${d.getDate()}/${(d.getMonth() + 1 + "").padStart(
        2,
        "0"
      )}/${d.getFullYear()}`
    });
  }
  async handleFormSubmit(event) {
    event.preventDefault();
    await axios
      .post(`${BACK_URL}/check/data`, { ...this.state.data })
      .then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.isValid) {
            this.setState({ error: [] });
            this.setState({ shouldRedirect: true });
            setTimeout(function() {
              window.location.replace(res.data.redirectionUrl);
            }, 1000);
          } else {
            this.setState({ error: res.data.error });
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    return (
      <div className="container py-3">
        <div className="row">
          <div className="mx-auto col-sm-6">
            <Error error={this.state.error} />
            <Success shouldRedirect={this.state.shouldRedirect} />
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">User information</h4>
              </div>
              <div className="card-body">
                <form className="form" onSubmit={this.handleFormSubmit}>
                  {this.props.data && this.props.data.fieldsui
                    ? this.props.data.fieldsui.map((d, i) => (
                        <div className="form-group" key={i}>
                          {!d.xtype && (
                            <React.Fragment>
                              {d.name.includes("text") && (
                                <input
                                  type="text"
                                  value={d.value}
                                  name={d.name}
                                  onChange={event =>
                                    this.setState({
                                      data: Object.assign({}, this.state.data, {
                                        [d.name]: event.target.value
                                      })
                                    })
                                  }
                                  className="form-control"
                                />
                              )}
                              {d.name.includes("date") && (
                                <input
                                  type="date"
                                  id={`date-${i}`}
                                  value={this.getDate(d.value, `date-${i}`)}
                                  name={d.name}
                                  onChange={event =>
                                    this.setState({
                                      data: Object.assign({}, this.state.data, {
                                        [d.name]: event.target.value
                                      })
                                    })
                                  }
                                  className="form-control"
                                />
                              )}
                              {d.name.includes("number") && (
                                <input
                                  type="number"
                                  name={d.name}
                                  value={d.value}
                                  onChange={event =>
                                    this.setState({
                                      data: Object.assign({}, this.state.data, {
                                        [d.name]: event.target.value
                                      })
                                    })
                                  }
                                  className="form-control"
                                />
                              )}
                              {d.name.includes("textarea") && (
                                <textarea
                                  class="form-control"
                                  name={d.name}
                                  onChange={event =>
                                    this.setState({
                                      data: Object.assign({}, this.state.data, {
                                        [d.name]: event.target.value
                                      })
                                    })
                                  }
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                ></textarea>
                              )}
                            </React.Fragment>
                          )}
                          {d.xtype && d.xtype === "button" && (
                            <button
                              type="submit"
                              name={d.name}
                              className="btn btn-primary"
                            >
                              {" "}
                              {d.text}
                            </button>
                          )}
                        </div>
                      ))
                    : "Loading..."}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MainViewV2;
