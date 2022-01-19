import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stratergy';
import { ProfileRepository } from '../profile/profile.repository';
import { ProfileService } from '../profile/profile.service';
import { TagRepository } from '../tag/tag.repository';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'dummy',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      ProfileRepository,
      TagRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ProfileService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
