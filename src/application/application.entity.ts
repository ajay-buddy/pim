import { User } from 'src/auth/user.entity';
import { Job } from 'src/job/job.entity';
import { Product } from 'src/products/products.entity';
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
import { APPLICATIONSTAGE } from './enum/application-stage.enum';

@Entity()
@Unique(['job', 'applied_by'])
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: APPLICATIONSTAGE.APPLIED })
  stage: APPLICATIONSTAGE;

  @ManyToOne(() => User, (user) => user.application)
  @JoinColumn()
  applied_by: User;

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
