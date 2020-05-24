import React from "react";

import { defaultProps, propTypes } from "./Posts.props";
import PostPreview from "components/PostPreview";
import styles from "./Posts.module.scss";

Posts.defaultProps = defaultProps;
Posts.propTypes = propTypes;

function Posts ({ posts }) {
    const postElems = getTestPosts().map(post => ( // TODO: testPosts -> posts
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
        </article>
    );
}

export default Posts;

function getTestPosts () {
    return [
        {
            id: 1,
            author: {
                imageUrl: "https://miro.medium.com/fit/c/141/141/2*S6zgLZzZ2Poh4p0dGN3ceg.jpeg",
                name: "Lee Bob"
            },
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere sed quam in bibendum. In non interdum magna. In non ipsum ac felis mattis auctor. Maecenas sit amet mauris ut diam auctor interdum. Phasellus eu sapien ac mauris imperdiet viverra sed ac lectus. Maecenas magna velit, auctor et magna id, interdum efficitur nisl. Curabitur nec laoreet enim. Curabitur et libero in nisl gravida sagittis non in sapien. Donec congue interdum eros eget ullamcorper. Curabitur volutpat, arcu et aliquet volutpat, leo purus commodo augue, quis eleifend orci tellus at elit. Suspendisse pharetra quam sed ligula tristique fringilla.",
            createdAt: new Date("2020-04-28 13:43:00"),
            updatedAt: new Date("2020-04-28 13:43:00")
        },
        {
            id: 2,
            author: {
                imageUrl: "https://miro.medium.com/fit/c/141/141/2*S6zgLZzZ2Poh4p0dGN3ceg.jpeg",
                name: "Alice Potter"
            },
            title: "Interdum et malesuada fames",
            content: "Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor in dui sit amet pretium. Duis vel tortor pulvinar, ultrices elit eget, volutpat felis. Nam felis est, gravida ac arcu vitae, gravida elementum purus. Proin sed libero ut ipsum pulvinar feugiat at in odio. Praesent sagittis ultricies sagittis. Nunc at blandit erat. Nullam at est id urna tincidunt imperdiet.",
            createdAt: new Date("2020-04-22 15:11:27"),
            updatedAt: new Date("2020-04-22 16:10:44")
        },
        {
            id: 3,
            author: {
                imageUrl: "https://miro.medium.com/fit/c/141/141/2*S6zgLZzZ2Poh4p0dGN3ceg.jpeg",
                name: "Uncle Joe"
            },
            title: "Ut vitae",
            content: "Ut vitae luctus massa, sed ultrices odio. Vestibulum sagittis libero tellus, et vulputate felis finibus sit amet. Proin velit nulla, vulputate in tellus non, dapibus sodales leo. Donec iaculis commodo hendrerit. Praesent efficitur congue velit, non commodo justo finibus ultrices. Nam dolor neque, lobortis at tincidunt at, dictum et nunc. In vel ex sed sem dictum imperdiet quis nec eros. Nullam eu malesuada magna, at iaculis diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor in dui sit amet pretium. Duis vel tortor pulvinar, ultrices elit eget, volutpat felis. Nam felis est, gravida ac arcu vitae, gravida elementum purus. Proin sed libero ut ipsum pulvinar feugiat at in odio. Praesent sagittis ultricies sagittis. Nunc at blandit erat. Nullam at est id urna tincidunt imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor in dui sit amet pretium. Duis vel tortor pulvinar, ultrices elit eget, volutpat felis. Nam felis est, gravida ac arcu vitae, gravida elementum purus. Proin sed libero ut ipsum pulvinar feugiat at in odio. Praesent sagittis ultricies sagittis. Nunc at blandit erat. Nullam at est id urna tincidunt imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor in dui sit amet pretium. Duis vel tortor pulvinar, ultrices elit eget, volutpat felis. Nam felis est, gravida ac arcu vitae, gravida elementum purus. Proin sed libero ut ipsum pulvinar feugiat at in odio. Praesent sagittis ultricies sagittis. Nunc at blandit erat. Nullam at est id urna tincidunt imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor in dui sit amet pretium. Duis vel tortor pulvinar, ultrices elit eget, volutpat felis. Nam felis est, gravida ac arcu vitae, gravida elementum purus. Proin sed libero ut ipsum pulvinar feugiat at in odio. Praesent sagittis ultricies sagittis. Nunc at blandit erat. Nullam at est id urna tincidunt imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam auctor in dui sit amet pretium. Duis vel tortor pulvinar, ultrices elit eget, volutpat felis. Nam felis est, gravida ac arcu vitae, gravida elementum purus. Proin sed libero ut ipsum pulvinar feugiat at in odio. Praesent sagittis ultricies sagittis. Nunc at blandit erat. Nullam at est id urna tincidunt imperdiet.",
            createdAt: new Date("2020-04-24 15:53:27"),
            updatedAt: new Date("2020-04-24 15:53:27")
        },
        {
            id: 4,
            author: {
                imageUrl: "https://miro.medium.com/fit/c/141/141/2*S6zgLZzZ2Poh4p0dGN3ceg.jpeg",
                name: "Nameless"
            },
            title: "Morbi laoreet",
            content: "Morbi laoreet arcu velit, nec aliquam eros faucibus tristique. Duis lacinia consequat ultrices. Integer at odio a nisl iaculis consequat ut id est. Nam eget erat eu lorem egestas feugiat. Etiam malesuada dui nec massa lacinia, nec cursus tortor molestie. Vivamus neque orci, porta eget tincidunt id, aliquet vitae magna. Vestibulum in elit sem. Sed id faucibus erat, et venenatis massa. Nam pretium nisl sed leo bibendum tempus.",
            createdAt: new Date("2020-05-13 15:47:42"),
            updatedAt: new Date("2020-05-20 10:17:20")
        },
        {
            id: 5,
            author: {
                imageUrl: "https://miro.medium.com/fit/c/141/141/2*S6zgLZzZ2Poh4p0dGN3ceg.jpeg",
                name: "Thio"
            },
            title: "Vestibulum sit amet",
            content: "Vestibulum sit amet ligula eu ex aliquet elementum. Nulla ultrices at odio ac tincidunt. Maecenas sagittis sem nibh, a varius dui fermentum non. Etiam pharetra auctor venenatis. Fusce vitae ligula metus. Vivamus id leo pulvinar, tincidunt quam a, dignissim leo. Cras fringilla, sem non fermentum sollicitudin, neque urna porttitor ligula, quis tincidunt elit tortor eget augue. Sed eu dui urna. Etiam rutrum lorem nulla, in fringilla ligula elementum vel. Vivamus a ipsum tellus. Pellentesque ultricies sem eget ullamcorper semper. Nullam et pellentesque arcu, a blandit risus. Donec varius lacus tortor, pellentesque pharetra risus aliquam vel. Mauris eget metus mauris. Vestibulum tempor blandit dignissim.",
            createdAt: new Date("2020-04-22 15:15:34"),
            updatedAt: new Date("2020-04-23 13:13:31")
        }
    ];
}