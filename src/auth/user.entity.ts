import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { USERTYPE } from './enum/user-type.enum';
import { Application } from 'src/application/application.entity';
import { Profile } from 'src/profile/profile.entity';
import { Education } from '../education/education.entity';
import { Experience } from 'src/experience/experience.entity';
import { Project } from 'src/project/project.entity';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  @Column()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  @Column()
  salt: string;

  @Column()
  user_type: USERTYPE;

  @ManyToOne(() => User, (user) => user.managee)
  @JoinColumn()
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  managee: User[];

  @OneToOne(() => Profile, (profile) => profile.belongs_to)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Education, (education) => education.belongs_to)
  @JoinColumn()
  education: Education[];

  @OneToMany(() => Project, (project) => project.belongs_to)
  @JoinColumn()
  project: Project[];

  @OneToMany(() => Experience, (experience) => experience.belongs_to)
  @JoinColumn()
  experience: Experience[];

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

  toJSON() {
    return classToPlain(this);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
