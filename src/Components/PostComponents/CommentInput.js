import React from 'react'

export const CommentInput = ({ setCommentText, addComment, setShowCommentInput }) => {

    return (
        <div className="comment-form-container">
            <form onSubmit={(e) => addComment(e)}>
                <input type="text" placeholder="Type a comment" onChange={e => setCommentText(e.target.value)} />
                <button type="submit">Add Comment</button>
            </form>
            <button className="btn-cancel" onClick={e => setShowCommentInput(false)}>Cancel</button>
        </div>
    )
}
