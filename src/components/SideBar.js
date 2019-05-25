import React from "react";

const NavItem = ({ label, url }) => (
  <li className="nav-item" style={{ marginLeft: 5, marginRight: 5 }}>
    <a className="pure-button" href={url} target="javascript:void(0);">
      {label}
    </a>
  </li>
);

export default class SideBar extends React.PureComponent {
  render() {
    const {
      brandTitle = "苑朋飞的日志",
      brandTagline = "热爱 & 分享",
      navs
    } = this.props;
    return (
      <div className="sidebar pure-u-1 pure-u-md-1-4">
        <div className="header">
          <h1 className="brand-title">{brandTitle}</h1>
          <h2 className="brand-tagline">{brandTagline}</h2>

          <nav className="nav">
            <ul className="nav-list">
              {navs.map((v, idx) => (
                <NavItem {...v} key={idx} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
