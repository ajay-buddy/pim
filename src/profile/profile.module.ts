import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { TagRepository } from 'src/tag/tag.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileRepository,
      UserRepository,
      TagRepository,
    ]),
  ],

  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
