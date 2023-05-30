import { Module } from "@nestjs/common"
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "src/users/users.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../users/schema/user.schema"
import { LocalStrategy } from './local.auth';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }







// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
// import { UsersModule } from 'src/users/users.module';
// // import { AuthService } from './auth.service';
// // import { PassportModule } from '@nestjs/passport';
// // import { ConfigModule } from '@nestjs/config';
// // import { AuthStrategy } from './strategies/auth.strategy';
// // import { AuthMiddleware } from './auth.middleware';
//import { AuthController } from './auth.controller';

// @Module({
//   imports: [PassportModule, UsersModule],
//   providers: [AuthService, LocalStrategy]
// })
// export class AuthModule {}
// //   imports: [PassportModule, ConfigModule],
// //   providers: [AuthService, AuthStrategy],
// // })
// // export class AuthModule implements NestModule {
// //   configure(consumer: MiddlewareConsumer) {
// //     consumer.apply(AuthMiddleware).forRoutes('/*');
// //   }
// // }
