import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdminScoreDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
