import React from "react";
import Useritem from "./UserItem";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";

const Users = ({ loading, users }) => {
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

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default Users;
