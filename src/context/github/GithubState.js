import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducers from "./githubReducer";
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS
} from "../types";

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(GithubReducers, initialState);

	// Search Github users
	const searchUsers = async text => {
		setLoading();
		const clientId = process.env.REACT_APP_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
		);

		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items
		});
	};

	// Get Users
	const getUser = async username => {
		setLoading();
		const clientId = process.env.REACT_APP_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
		);

		dispatch({ type: GET_USER, payload: res.data });
	};

	// Get Repos
	const getUserRepos = async username => {
		setLoading();

		const clientId = process.env.REACT_APP_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
		);

		dispatch({ type: GET_REPOS, payload: res.data });
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
