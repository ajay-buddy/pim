import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ProfileRepository } from '../profile/profile.repository';
import { UserRepository } from 'src/auth/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository, UserRepository])],

  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
