import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoticeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}