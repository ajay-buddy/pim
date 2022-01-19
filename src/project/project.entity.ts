import { User } from 'src/auth/user.entity';
import { Company } from 'src/company/company.entity';
import { PROJECTTYPE } from 'src/job/enum/employment_type.enum';
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
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  name: string;

  @Column({ type: 'date', nullable: true })
  start: string;

  @Column({ type: 'date', nullable: true })
  end: string;

  @Column()
  description: string;

  @Column()
  company_name: string;

  @Column()
  type: PROJECTTYPE;

  @ManyToOne(() => Company, (company) => company.projects)
  @JoinTable()
  project_company: Company;

  @ManyToMany(() => Tag, (tag) => tag.projects, { eager: true })
  @JoinTable()
  project_tags: Tag[];

  @ManyToOne(() => User, (user) => user.project)
  @JoinColumn()
  belongs_to: User;

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
