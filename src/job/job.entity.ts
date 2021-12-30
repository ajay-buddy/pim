import { User } from 'src/auth/user.entity';
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
} from 'typeorm';
import { EMPLOYMENTTYPE } from './enum/employment_type.enum';
import { Application } from '../application/application.entity';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  company_name: string;

  @Column()
  type: EMPLOYMENTTYPE;

  @Column()
  is_active: boolean;

  @Column()
  vacancies: number;

  @Column({ default: 0 })
  applied_count: number;

  @OneToMany(() => Application, (application) => application.job)
  @JoinColumn()
  application: Application[];

  @ManyToMany(() => Tag, (tag) => tag.profile, { eager: true })
  @JoinTable()
  job_tags: Tag[];

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
