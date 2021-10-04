import React, { useContext } from "react";
import Useritem from "./UserItem";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
	const githubContext = useContext(GithubContext);
	const { loading, users } = githubContext;

	if (loading) {
		return <Spinner />;
	}
	return (
		<div style={userStyle}>
			{users.map(UserData => {
				return <Useritem key={UserData.id} user={UserData} />;
			})}
		</div>
	);
};

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: "1rem"
};

export default Users;
