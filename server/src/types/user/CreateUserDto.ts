interface CreateUserDto {
    birthdate?: Date;
    email: string;
    isConfirmed?: boolean;
    name: string;
    password?: string;
    picture?: Buffer | null;
}

export default CreateUserDto;
