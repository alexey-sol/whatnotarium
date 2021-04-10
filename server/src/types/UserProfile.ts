interface UserProfile {
    about?: string;
    birthdate?: Date;
    name: string;
    picture?: Buffer;
    totalVoteCount: number;
}

export default UserProfile;
