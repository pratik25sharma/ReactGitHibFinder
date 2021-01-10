import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import "./App.css";

class App extends Component {
    state = {
        loading: false,
        users: [],
        alert: null,
        user: {},
        repos: []
    };

    // Search Github users
    searchUsers = async text => {
        this.setState({ loading: true });
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
        );

        this.setState({
            loading: false,
            users: res.data.items
        });
    };

    getUser = async username => {
        this.setState({ loading: true });
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
        );

        this.setState({
            loading: false,
            user: res.data
        });
    };

    getUserRepos = async username => {
        this.setState({ loading: true });
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
        );

        this.setState({
            loading: false,
            repos: res.data
        });
    };

    clearUsers = () => {
        this.setState({
            users: [],
            loading: false
        });
    };

    setAlert = (msg, type) => {
        this.setState({
            alert: {
                msg,
                type
            }
        });

        setTimeout(() => this.setState({ alert: null }), 5000);
    };

    render() {
        const { users, loading, user, repos } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navbar title="gitHubfinder" />
                    <div className="container">
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" component={About} />
                            <Route
                                exact
                                path="/user/:login"
                                render={props => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
