import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import Paging from "components/Paging";
import PostPreview from "components/PostPreview";
import { defaultProps, propTypes } from "./PostList.props";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";
import styles from "./PostList.module.scss";

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
            {(posts.length > 0)
                ? <ul className={styles.postList}>{postElems}</ul>
                : <div>Ничего не нашли</div>}

            <div className={styles.pagingContainer}>
                <Paging
                    count={postsOnPageCount}
                    currentPage={currentPage}
                    setCurrentPage={onSetCurrentPage}
                    totalRecords={totalCount}
                />
            </div>
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
