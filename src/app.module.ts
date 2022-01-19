import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type-orm-config';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { AppModule1 } from './app/app.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { EducationModule } from './education/education.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { CompanyModule } from './company/company.module';
import { CollageModule } from './collage/collage.module';
import { UniversityModule } from './university/university.module';
import { CourseModule } from './course/course.module';
import { ActionModule } from './actions/action.module';
import { StageModule } from './stages/stage.module';
import { SpocModule } from './spoc/spoc.module';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    AuthModule,
    NotificationModule,
    AppModule1,

    ProfileModule,
    TagModule,
    ExperienceModule,
    ProjectModule,
    EducationModule,
    JobModule,
    ApplicationModule,
    CompanyModule,
    CollageModule,
    UniversityModule,
    CourseModule,
    ActionModule,
    StageModule,
    SpocModule,
    DashboardModule,
  ],
})
export class AppModule {}
