import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ScoreService } from './score.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('scores')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createScore(@Body('score') score: number, @Request() req) {
    const username = req.user.username;
    const isAdmin = req.user.isAdmin;
    return this.scoreService.createScore(username, score, isAdmin);
  }

  @Get('leaderboard')
  async getTopScores() {
    const scores = await this.scoreService.getTopScores();
    return scores.map((score) => ({
      username: score.user.username,
      score: score.score,
    }));
  }
}
