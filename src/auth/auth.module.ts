import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthStrategy } from './strategies/auth.strategy';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/*');
  }
}
