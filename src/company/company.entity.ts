import { Project } from 'src/project/project.entity';
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
  JoinColumn,
} from 'typeorm';
import { Job } from 'src/job/job.entity';
import { Experience } from 'src/experience/experience.entity';
import { Spoc } from 'src/spoc/spoc.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Spoc, (spoc) => spoc.company)
  @JoinColumn()
  spoc: Spoc[];

  @OneToMany(() => Project, (project) => project.project_company, {
    eager: true,
  })
  @JoinColumn()
  projects: Project[];

  @OneToMany(() => Experience, (experience) => experience.experience_company, {
    eager: true,
  })
  @JoinColumn()
  experience: Experience[];

  @OneToMany(() => Job, (job) => job.job_company)
  @JoinColumn()
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
