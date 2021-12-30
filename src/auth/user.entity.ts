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
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { USERTYPE } from './enum/user-type.enum';
import { Application } from 'src/application/application.entity';
import { Profile } from 'src/profile/profile.entity';
import { Education } from '../education/education.entity';
import { Experience } from 'src/experience/experience.entity';
import { Project } from 'src/project/project.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column()
  user_type: USERTYPE;

  @OneToMany(() => Application, (application) => application.job)
  @JoinColumn()
  application: Application[];

  @OneToOne(() => Profile, (profile) => profile.belongs_to)
  @JoinColumn()
  profile: Profile[];

  @OneToOne(() => Education, (education) => education.belongs_to)
  @JoinColumn()
  education: Education[];

  @OneToOne(() => Project, (project) => project.belongs_to)
  @JoinColumn()
  project: Project[];

  @OneToOne(() => Experience, (experience) => experience.belongs_to)
  @JoinColumn()
  experience: Experience[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
