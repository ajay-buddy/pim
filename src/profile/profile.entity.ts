import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/products.entity';
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
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  first_name: string;
  @Column({ nullable: true })
  last_name: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  f_name: string;
  @Column({ nullable: true })
  m_name: string;
  @Column({ nullable: true })
  pan_number: string;
  @Column({ nullable: true })
  adhar_number: string;
  @Column({ type: 'date', nullable: true })
  dob: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  llPhone: string;
  @Column({ nullable: true })
  alternatePhone: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  state: string;
  @Column({ nullable: true })
  country: string;
  @Column({ nullable: true })
  job_type: string;
  @Column('boolean', { default: false })
  active: boolean = false;
  @Column('boolean', { default: false })
  engaged: boolean = false;

  @ManyToMany(() => Tag, (tag) => tag.profile, { eager: true })
  @JoinTable()
  profile_tags: Tag[];

  @OneToOne(() => User, (user) => user.profile)
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
