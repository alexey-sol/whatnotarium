import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Paging from "components/ui/Paging";
import PostPreview from "components/posts/PostPreview";
import { defaultProps, propTypes } from "./PostList.props";
import { selectCount } from "redux/postsPaging/postsPaging.selectors";
import { selectCurrentUser } from "redux/session/session.selectors";
import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";
import styles from "./PostList.module.scss";

PostList.defaultProps = defaultProps;
PostList.propTypes = propTypes;

function PostList ({
    currentPage,
    currentUser,
    onSetCurrentPage,
    pathPrefix,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const postElems = posts.map(post => (
        <li
            className={styles.postItem}
            key={post.id}
        >
            <PostPreview currentUser={currentUser} post={post} />
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
                    pathPrefix={pathPrefix}
                    setCurrentPage={onSetCurrentPage}
                    totalRecords={totalCount}
                />
            </div>
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    postsOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);

export default ConnectedPosts;
