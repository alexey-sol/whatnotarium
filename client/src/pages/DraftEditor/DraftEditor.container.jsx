import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    clearAllErrors,
    createPostStart,
    deletePostStart,
    getPostStart,
    updatePostStart
} from "redux/post/post.actions";

import DraftEditor from "./DraftEditor.component";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectCreatedPost,
    selectCreatedPostError,
    selectDeletedPost,
    selectDeletedPostError,
    selectGottenPost,
    selectGottenPostError,
    selectUpdatedPost,
    selectUpdatedPostError
} from "redux/post/post.selectors";

import {
    selectCreatedPostPending,
    selectDeletedPostPending,
    selectUpdatedPostPending
} from "redux/pending/pending.selectors";

const mapStateToProps = createStructuredSelector({
    createdPost: selectCreatedPost,
    createdPostError: selectCreatedPostError,
    createdPostPending: selectCreatedPostPending,
    currentUser: selectCurrentUser,
    deletedPost: selectDeletedPost,
    deletedPostError: selectDeletedPostError,
    deletedPostPending: selectDeletedPostPending,
    gottenPost: selectGottenPost,
    gottenPostError: selectGottenPostError,
    updatedPost: selectUpdatedPost,
    updatedPostError: selectUpdatedPostError,
    updatedPostPending: selectUpdatedPostPending
});

const mapDispatchToProps = (dispatch) => ({
    onClearAllErrors: () => dispatch(clearAllErrors()),
    onCreatePostStart: (props) => dispatch(createPostStart(props)),
    onDeletePostStart: (id) => dispatch(deletePostStart(id)),
    onGetPostStart: (id) => dispatch(getPostStart(id)),
    onUpdatePostStart: (props) => dispatch(updatePostStart(props))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditor);

export default ConnectedDraftEditor;
