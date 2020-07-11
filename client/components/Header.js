import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/CurrentUser";
import mutation from "../mutations/logout";

class Header extends Component {
  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Log Out</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </div>
      );
    }
  }
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
