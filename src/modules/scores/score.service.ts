import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createScore(user: User, score: number): Promise<Score> {
    const userScore = this.scoresRepository.create({
      user,
      score,
    });
    return this.scoresRepository.save(userScore);
  }

  async getTopScores(limit: number = 10): Promise<Score[]> {
    return this.scoresRepository.find({
      order: {
        score: 'DESC',
      },
      take: limit,
    });
  }
}
