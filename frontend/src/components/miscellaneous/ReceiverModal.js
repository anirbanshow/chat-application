import React from 'react';

const ReceiverModal = ({ user }) => {
    return (
        <div className="modal fade" id="receiverModal" tabIndex="-1" aria-labelledby="receiverModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger">{user.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={user.pic} alt="" />
                        <h5 className="text-danger">Email: {user.email}</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiverModal;