import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';
import { ProfileRepository } from '../profile/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository, ProfileRepository])],

  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
