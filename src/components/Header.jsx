import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
        <div className="header">
          <nav className="navbar navbar-dark bg-dark">
            <span id="title">Form validator</span>
        </nav>
        </div>
    )
  }
}
  export default Header;