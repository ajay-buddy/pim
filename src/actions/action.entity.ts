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
import {
  Application,
  ApplicationActivity,
} from '../application/application.entity';
import { Profile } from 'src/profile/profile.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => ApplicationActivity, (application) => application.action)
  @JoinTable()
  application: ApplicationActivity[];

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
