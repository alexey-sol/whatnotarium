import CreatePostDto from "./CreatePostDto";

interface UpdatePostDto extends Omit<Partial<CreatePostDto>, "userId"> {
    isApproved?: boolean;
    isFrozen?: boolean;
    viewCount?: number;
}

export default UpdatePostDto;
