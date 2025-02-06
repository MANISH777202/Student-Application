import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";
import SearchBarComponent from "./SearchBarComponent.jsx";
import AccountProfileService from "../../api/main/AccountProfileService";
import Logo from "./assets/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "./Avatar";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: AuthenticationService.getLoggedInUserName(),
    };

    // Bind methods to this context
    this.refreshInfo = this.refreshInfo.bind(this);
  }

  componentDidMount() {
    // Call refreshInfo when the component mounts
    this.refreshInfo();
  }

  refreshInfo() {
    let username = AuthenticationService.getLoggedInUserName();
    AccountProfileService.retrieveInfo(username)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          this.setState({
            username: response.data[0].username,
          });
        } else {
          // Redirect to welcome page if no user data is found
          window.location.href = "http://localhost:4200/welcome/sept";
        }
      })
      .catch((error) => console.error("Failed to retrieve user info", error));
  }

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const { username } = this.state;

    return (
      <>
        {isUserLoggedIn && (
          <header>
            <Navbar
              expand="md"
              className="navbar navbar-expand-md navbar-dark bg-dark"
            >
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-bottom">Back to home</Tooltip>}
              >
                <Link className="nav-link" to="/welcome/">
                  <img src={Logo} alt="Logo" className="rmitLogo" />
                </Link>
              </OverlayTrigger>
              <ul
                className="navbar-nav d-md-block d-none"
                style={{ marginRight: "1.1rem" }}
              >
                <Link className="nav-link" to="/welcome/">
                  Home
                </Link>
              </ul>

              <SearchBarComponent refreshInfo={this.props.refreshInfo} />

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav navbar-collapse justify-content-end">
                  {/* Profile Link */}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">Visit your profile</Tooltip>
                    }
                  >
                    <li className="toProfile">
                      <Avatar username={username} />
                      <Link className="nav-link" to={`/profile/${username}`}>
                        {username}
                      </Link>
                    </li>
                  </OverlayTrigger>

                  {/* NewsFeed Link */}
                  <li>
                    <Link className="nav-link" to="/newsfeed">
                      NewsFeed
                    </Link>
                  </li>

                  {/* About Page Link */}
                  <li>
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>

                  {/* Logout Link */}
                  <li>
                    <Link
                      className="nav-link"
                      name="logout"
                      to="/logout"
                      onClick={AuthenticationService.logout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </Navbar.Collapse>
            </Navbar>
          </header>
        )}
      </>
    );
  }
}

export default HeaderComponent;
