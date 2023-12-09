import React, { useState } from 'react';

const DeleteMessage = (props) => {
    const { onCancel, onConfirm } = props
    // const [messageId, setMessageId] = useState('');
    // const [showConfirmation, setShowConfirmation] = useState(false);

    // const handleDelete = (e) => {
    //     e.preventDefault();
    //     setShowConfirmation(true);
    // };

    // const confirmDelete = () => {
    //     onDelete(messageId);
    //     setMessageId('');
    //     setShowConfirmation(false);
    // };

    // const cancelDelete = () => {
    //     setShowConfirmation(false);
    // };
    return (
        // <div>
        //     <form onSubmit={handleDelete}>
        //         <label htmlFor="messageId">Message ID:</label>
        //         <input
        //             type="text"
        //             id="messageId"
        //             value={messageId}
        //             onChange={(e) => setMessageId(e.target.value)}
        //         />
        //         <button type="submit">Delete Message</button>
        //     </form>
        //     {showConfirmation && (
        //         <div className="confirmation-dialog">
        //             <p>Are you sure you want to delete this message?</p>
        //             <button onClick={confirmDelete}>Yes</button>
        //             <button onClick={cancelDelete}>No</button>
        //         </div>
        //     )}
        // </div>
        <div className="confirmation-dialog">
            <p>Are you sure you want to delete this message?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    );
};

export default DeleteMessage;