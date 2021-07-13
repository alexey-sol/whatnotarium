import CreateUserDto from "./CreateUserDto";

interface UpdateUserDto extends Partial<CreateUserDto> {
    newPassword?: string;
}

export default UpdateUserDto;
