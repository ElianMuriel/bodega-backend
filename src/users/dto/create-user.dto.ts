import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role?: 'cliente' | 'vendedor' | 'admin';

    @IsString()
    @IsOptional()
    phone?: string;
}
