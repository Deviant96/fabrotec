import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { ScoreService } from 'src/modules/scores/score.service';

@Controller()
export class LeaderboardController {
  constructor(private readonly scoreService: ScoreService) {}

  @Public()
  @Get('/leaderboard')
  async getLeaderboard(): Promise<any[]> {
    return this.scoreService.getTopScores();
  }
}
