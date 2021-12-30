import { IsString } from 'class-validator';
export class AuthUploadImageDto {
  @IsString()
  image_name: string;

  @IsString()
  image_type: string;
}
