import { Project } from 'src/project/project.entity';
import { Profile } from '../profile/profile.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Job } from 'src/job/job.entity';
import { Education } from '../education/education.entity';
import { Experience } from 'src/experience/experience.entity';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: false })
  name: string;

  @ManyToMany(() => Project, (project) => project.project_tags)
  projects: Project[];

  @ManyToMany(() => Education, (education) => education.education_tags)
  education: Education[];

  @ManyToMany(() => Experience, (experience) => experience.experience_tags)
  experience: Experience[];

  @ManyToMany(() => Profile, (profile) => profile.profile_tags)
  profile: Profile[];

  @ManyToMany(() => Profile, (profile) => profile.profile_stags)
  s_profile: Profile[];

  @ManyToMany(() => Job, (job) => job.job_tags)
  job: Job[];

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
