import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/user.entity';
import { LeaderboardController } from 'src/leaderboard.controller';
import { LoggingModule } from 'src/modules/logging/logging.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoggingMiddleware } from 'src/modules/logging/logging.middleware';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/modules/users/user.service';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { jwtConstants } from 'src/common/constants/constants';
import { ScoreModule } from 'src/modules/scores/score.module';
import { Score } from 'src/modules/scores/score.entity';
import { ScoreService } from 'src/modules/scores/score.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db.sqlite',
      entities: [User, Score],
      synchronize: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    ScoreModule,
    LoggingModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [LeaderboardController, AuthController],
  providers: [
    ScoreService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
