import { IsString, IsOptional } from 'class-validator';

export class UpdateNoticeDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    message?: string;
}
