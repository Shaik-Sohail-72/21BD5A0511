import React from 'react';
const myStyle = { color:"#fff"};
const navStyle={ paddingTop:"2%", paddingLeft:"7%", paddingRight:"7%" };
const Navbar = () => {
  return(
    <div>
      <section className="colored-section" id="title">
        <div style={navStyle}>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="/">Train</a><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" >
                <a style={myStyle} className="nav-link nav-link-active" href="/">All Trains</a>
              </li>
              <li className="nav-item">
              <a style={myStyle} className="nav-link" href="/gettrain">Get Train</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    </div>
  );
};
export default Navbar;
