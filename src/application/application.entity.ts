import { User } from 'src/auth/user.entity';
import { Job } from 'src/job/job.entity';
import { Tag } from 'src/tag/tag.entity';
import internal from 'stream';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { Action } from '../actions/action.entity';
import { Stage } from 'src/stages/stage.entity';
import { Profile } from 'src/profile/profile.entity';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.application, {
    eager: true,
  })
  @JoinColumn()
  applicant: Profile;

  @OneToMany(
    () => ApplicationActivity,
    (applicationActivity) => applicationActivity.application,
    { cascade: ['insert', 'update'] },
  )
  @JoinColumn()
  logs: ApplicationActivity[];

  @ManyToOne(() => Job, (job) => job.application)
  @JoinColumn()
  job: Job;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  created_by: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  updated_by: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}

@Entity()
export class ApplicationActivity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Application, (application) => application.logs)
  @JoinColumn()
  application: Application;

  @ManyToOne(() => Action, (action) => action.application)
  @JoinColumn()
  action: Action;

  @ManyToOne(() => Profile, (profile) => profile.application_activity)
  @JoinColumn()
  profile: Profile;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  updated_by: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
