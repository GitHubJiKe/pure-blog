import React from "react";

export default class Layout extends React.PureComponent {
  render() {
    return (
      <div id="layout" className="pure-g">
        {this.props.children}
      </div>
    );
  }
}
