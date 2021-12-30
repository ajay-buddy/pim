import { User } from 'src/auth/user.entity';
import { EMPLOYMENTTYPE } from 'src/job/enum/employment_type.enum';
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
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: true })
  start: string;

  @Column({ type: 'date', nullable: true })
  end: string;

  @Column()
  description: string;

  @Column()
  company_name: string;

  @Column()
  type: EMPLOYMENTTYPE;

  @Column()
  is_present: boolean;

  @ManyToMany(() => Tag, (tag) => tag.experience, { eager: true })
  @JoinTable()
  experience_tags: Tag[];

  @ManyToOne(() => User, (user) => user.experience)
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
