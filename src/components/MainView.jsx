import React, { Component } from "react";
import axios from "axios";

import Error from "./ErrorMessages";
import Success from "./SuccessMessages";
import { BACK_URL } from "../configuration/config";

export class MainView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      shouldRedirect: false,
      error: [],
      data: {}
    };
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
                          <label>{d.label}</label>
                          {["text", "number", "date", "tel"].includes(
                            d.xtype
                          ) && (
                            <input
                              type={d.xtype}
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
                          {d.xtype === "button" && (
                            <button
                              type="submit"
                              name={d.name}
                              className="btn btn-primary"
                            >
                              {" "}
                              {d.text}
                            </button>
                          )}
                          {d.xtype === "textarea" && (
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
export default MainView;
