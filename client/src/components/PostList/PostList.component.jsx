import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import { defaultProps, propTypes } from "./PostList.props";
import Paging from "components/Paging";
import PostPreview from "components/PostPreview";
import styles from "./PostList.module.scss";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";

PostList.defaultProps = defaultProps;
PostList.propTypes = propTypes;

function PostList ({
    currentPage,
    onSetCurrentPage,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const postElems = posts.map(post => (
        <li
            className={styles.postItem}
            key={post.id}
        >
            <PostPreview {...post} />
        </li>
    ));

    return (
        <article className={styles.container}>
            <ul className={styles.postList}>
                {postElems}
            </ul>

            <Paging
                count={postsOnPageCount}
                currentPage={currentPage}
                setCurrentPage={onSetCurrentPage}
                totalRecords={totalCount}
            />
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentPage: selectCurrentPage,
    postsOnPageCount: selectCount,
    totalCount: selectTotalCount
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);

export default withRouter(ConnectedPosts);
