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
    private usersRepository: Repository<User>
  ) {}

  async createScore(username: string, score: number, isAdmin: boolean): Promise<Score> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const newScore = this.scoresRepository.create({ score, user });
    return this.scoresRepository.save(newScore);
  }

  async getTopScores(): Promise<Score[]> {
    return this.scoresRepository.find({
      order: { score: 'DESC' },
      take: 10,
      relations: ['user'],
    });
  }
}
