import React from 'react'

const SearchUserList = ({ user, handleFunction }) => {
    return (
        <div className="singleUser" onClick={handleFunction}>
            <img src={user.pic} />
            <div className="info">
                <h6>{user.name}</h6>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default SearchUserList;