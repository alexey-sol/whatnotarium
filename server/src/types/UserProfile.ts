interface UserProfile {
    about?: string;
    birthdate?: Date;
    name: string;
    picture?: Buffer;
    totalLikeCount: number;
}

export default UserProfile;
