import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/user.service';
import { ScoreService } from 'src/modules/scores/score.service';
import { ScoreController } from 'src/modules/scores/score.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Score, User])],
  providers: [ScoreService, JwtService, UserService],
  controllers: [ScoreController],
  exports: [TypeOrmModule],
})
export class ScoreModule {}
