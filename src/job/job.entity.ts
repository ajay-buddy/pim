import { User } from 'src/auth/user.entity';
import { Tag } from 'src/tag/tag.entity';
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
} from 'typeorm';
import { EMPLOYMENTTYPE } from './enum/employment_type.enum';
import { Application } from '../application/application.entity';
import { Company } from 'src/company/company.entity';
import { Spoc } from 'src/spoc/spoc.entity';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  vacancies: number;

  @Column({ nullable: true })
  jobCode: string;

  @Column({ default: 0 })
  applied_count: number;

  @OneToMany(() => Application, (application) => application.job)
  @JoinColumn()
  application: Application[];

  @ManyToOne(() => Company, (company) => company.job)
  @JoinTable()
  job_company: Company;

  @ManyToMany(() => Tag, (tag) => tag.profile, { eager: true })
  @JoinTable()
  job_tags: Tag[];

  @ManyToOne(() => Spoc, (spoc) => spoc.jobs, { eager: true })
  @JoinColumn()
  spoc: Spoc;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  created_by: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  updated_by: User;

  @Column({ type: 'date', nullable: true })
  req_date: Date;

  @Column({ nullable: true })
  req_id: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  submited_by: string;

  @Column({ nullable: true })
  priority: string;

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
