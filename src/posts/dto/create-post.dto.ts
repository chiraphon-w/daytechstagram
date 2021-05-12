import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  desc: string;

  @IsOptional()
  image: string;

}
