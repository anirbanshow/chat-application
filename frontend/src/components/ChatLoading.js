import React from 'react';

const ChatLoading = () => {
    return (
        <div className="spinner-border text-warning d-block mt-3 mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default ChatLoading;