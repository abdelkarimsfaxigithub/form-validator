import React, { Component } from "react";
import axios from "axios";

export class MainView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    await axios.post('http://127.0.0.1:4000/validator',{...this.state}).then(res=>{
      debugger;
    }).catch(e => {
      debugger;
      console.error(e);
    });
  }

  render() {
    return (
      <div className="container py-3">
        <div className="row">
          <div className="mx-auto col-sm-6">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">User Information</h4>
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
                              onChange={(event) =>
                                this.setState({ [d.name]: event.target.value })
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
                              onChange={(event) =>
                                this.setState({ [d.name]: event.target.value })
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
