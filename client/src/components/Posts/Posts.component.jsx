import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./Posts.props";
import Paging from "components/Paging";
import PostPreview from "components/PostPreview";
import styles from "./Posts.module.scss";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { fetchPostsStart } from "redux/posts/posts.actions";
import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";

Posts.defaultProps = defaultProps;
Posts.propTypes = propTypes;

function Posts ({
    currentPage,
    onFetchPostsStart,
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

    const onChangePage = (page) => {
        onSetCurrentPage(page);
        onFetchPostsStart({ count: postsOnPageCount, page });
    }; // TODO: maybe move fetching logic to Paging comp itself?

    return (
        <article className={styles.container}>
            <ul className={styles.postList}>
                {postElems}
            </ul>

            <Paging
                count={postsOnPageCount}
                currentPage={currentPage}
                onChangePage={onChangePage}
                pageNeighbours={4}
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
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);

export default ConnectedPosts;
