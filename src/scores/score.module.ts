import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { User } from '../users/user.entity';
import { ScoreService } from 'src/scores/score.service';
import { ScoreController } from 'src/scores/score.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Score, User])],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
