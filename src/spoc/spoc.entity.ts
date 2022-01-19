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
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Job } from 'src/job/job.entity';
import { Company } from 'src/company/company.entity';

@Entity()
export class Spoc extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  spoc_id: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => Profile, (profile) => profile.spoc_owner)
  @JoinColumn()
  owner: Profile;

  @ManyToOne(() => Company, (company) => company.spoc)
  @JoinColumn()
  company: Company;

  @OneToMany(() => Job, (job) => job.spoc)
  @JoinColumn()
  jobs: Job[];

  @ManyToMany(() => Profile, (profile) => profile.spoc)
  @JoinTable()
  recruiters: Profile[];

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
