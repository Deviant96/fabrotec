import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserScoreDto {
  @IsNotEmpty()
  @IsNumber()
  score: number;
}
