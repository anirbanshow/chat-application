import React from 'react';

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <span>{user.name} <b onClick={handleFunction}>X</b> </span>
    )
}

export default UserBadgeItem;