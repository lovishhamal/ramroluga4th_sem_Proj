import React, { useState } from "react";

import "./Sidedrawer.css";
import Login from "../Login/Login";

function Sidedrawer(props) {
  const [state, setstate] = useState(false);

  let sidedrawer = "sidedrawer";
  if (props.show) {
    sidedrawer = "sidedrawer open";
  }
  let popuplogin;

  if (state) {
    console.log("State -> ", state);
    popuplogin = (
      <Login
        onClick={() => {
          setstate(!state);
        }}
      />
    );
    sidedrawer = "sidedrawer";
  }

  let login = (
    <div className="Sidedrawer-main">
      <div className={sidedrawer}>
        <div className="close" onClick={props.close}>
          <i className="far fa-times-circle" />
        </div>
        <ul className="sidebar-items">
          <li>
            <a href="/about" className="nav-links">
              About
            </a>
          </li>
          <li>
            <a href="" className="nav-links">
              Designers
            </a>
          </li>
          <li>
            <a href="" className="nav-links">
              Customers
            </a>
          </li>
          <li>
            <a href="" className="nav-links">
              Customer Support
            </a>
          </li>
          <li>
            {" "}
            <a
              href="#"
              className="nav-links"
              onClick={() => {
                {
                  setstate(!state);
                }
              }}
            >
              Login <i className="fas fa-sign-in-alt" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <div>
      {login}
      {popuplogin}
    </div>
  );
}

export default Sidedrawer;
