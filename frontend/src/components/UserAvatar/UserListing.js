import React from 'react';

const UserListing = ({ user, handleFunction }) => {
    return (
        <div className="eachUser bg-secondary" key={user._id} onClick={handleFunction}>
            <img src={user.pic} alt="" />
            <div className="info">
                <h6>{user.name}</h6>
                <p> <b>Email:</b> {user.email} </p>
            </div>
        </div>
    )
}

export default UserListing;