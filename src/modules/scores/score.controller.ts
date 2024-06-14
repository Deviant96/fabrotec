import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { Role } from 'src/modules/auth/roles.enum';
import { CreateUserScoreDto } from 'src/modules/scores/dto/create-user-score.dto';
import { CreateAdminScoreDto } from 'src/modules/scores/dto/create-admin-score.dto';
import { UserService } from 'src/modules/users/user.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@Controller('scores')
export class ScoreController {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly usersService: UserService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, ThrottlerGuard)
  @Roles(Role.User, Role.Admin)
  async createScore(
    @Request() req,
    @Body() createUserScoreDto: CreateUserScoreDto,
  ) {
    return this.scoreService.createScore(req.user.id, createUserScoreDto.score);
  }

  @Post('/admin')
  @UseGuards(JwtAuthGuard, RolesGuard, ThrottlerGuard)
  @Roles(Role.Admin)
  async createScoreForAnyUser(
    @Body() createAdminScoreDto: CreateAdminScoreDto,
  ) {
    const user = await this.usersService.findOne(createAdminScoreDto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.scoreService.createScore(user, createAdminScoreDto.score);
  }

  @Get('leaderboard')
  @UseGuards(JwtAuthGuard, RolesGuard, ThrottlerGuard)
  @Public()
  async getTopScores() {
    const scores = await this.scoreService.getTopScores();
    return this.scoreService.getTopScores();
  }
}
