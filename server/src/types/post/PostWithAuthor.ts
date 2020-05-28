import FormattedPostProps from "#types/post/FormattedProps";
import FormattedUserProps from "#types/user/FormattedProps";

interface PostWithAuthor extends FormattedPostProps {
    author: FormattedUserProps;
}

export default PostWithAuthor;
