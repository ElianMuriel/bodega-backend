import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional() // si quieres que el rol por defecto sea 'cliente'
    role?: 'cliente' | 'vendedor' | 'admin';
}
