import { User } from 'src/auth/user.entity';
import { Collage } from 'src/collage/collage.entity';
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
import { EDUCATIONTYPE } from './eunm/education-type.enum';
import { University } from '../university/university.entity';
import { Course } from '../course/course.entity';

@Entity()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  name: string;

  @Column({ type: 'date', nullable: true })
  start: string;

  @Column({ type: 'date', nullable: true })
  end: string;

  @Column()
  collage_name: string;

  @Column()
  university_name: string;

  @Column()
  type: EDUCATIONTYPE;

  @ManyToMany(() => Tag, (tag) => tag.education, { eager: true })
  @JoinTable()
  education_tags: Tag[];

  @ManyToOne(() => Collage, (collage) => collage.education)
  @JoinTable()
  education_collage: Collage;

  @ManyToOne(() => Course, (course) => course.education)
  @JoinTable()
  education_course: Course;

  @ManyToOne(() => University, (university) => university.education)
  @JoinTable()
  education_university: University;

  @ManyToOne(() => User, (user) => user.education)
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
