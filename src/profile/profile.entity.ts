import { User } from 'src/auth/user.entity';
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
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import {
  Application,
  ApplicationActivity,
} from 'src/application/application.entity';
import { Spoc } from 'src/spoc/spoc.entity';
import { Action } from 'src/actions/action.entity';

@Entity()
@Tree('closure-table', {
  closureTableName: 'profile_closure',
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: false })
  user_type: string;
  @Column({ nullable: true })
  name: string;
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
  headline: string;
  @Column({ nullable: true })
  notice: number;
  @Column({ nullable: true })
  other_skills: string;
  @Column({ nullable: true })
  c_location: string;
  @Column({ nullable: true })
  p_location: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  llPhone: string;
  @Column({ nullable: true })
  alternatePhone: string;
  @Column({ nullable: true, unique: true })
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
  @Column({ nullable: true })
  emp_code: string;
  @Column({ nullable: true })
  profile_status: string;
  @Column({ nullable: true })
  resumeUrl: string;
  @Column('boolean', { default: false })
  active: boolean = false;
  @Column('boolean', { default: false })
  engaged: boolean = false;
  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
    default: 0,
    nullable: true,
  })
  experience: number;
  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
    default: 0,
    nullable: true,
  })
  current_ctc: number;
  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
    default: 0,
    nullable: true,
  })
  expected_ctc: number;
  @ManyToMany(() => Tag, (tag) => tag.profile, { eager: true })
  @JoinTable()
  profile_tags: Tag[];
  @ManyToMany(() => Tag, (tag) => tag.s_profile, { eager: true })
  @JoinTable()
  profile_stags: Tag[];
  @OneToOne(() => User, (user) => user.profile, { cascade: true, eager: true })
  @JoinColumn()
  belongs_to: User;
  @OneToMany(() => Spoc, (spoc) => spoc.owner)
  spoc_owner: Spoc[];

  // @ManyToOne(() => Profile, (profile) => profile.managee)
  @TreeParent()
  manager: Profile;

  // @OneToMany(() => Profile, (profile) => profile.manager)
  @TreeChildren()
  managee: Profile[];

  @ManyToMany(() => Spoc, (spoc) => spoc.recruiters)
  @JoinTable()
  spoc: Spoc[];

  @OneToMany(() => Application, (application) => application.applicant)
  @JoinColumn()
  application: Application[];

  @OneToMany(
    () => ApplicationActivity,
    (applicationActivity) => applicationActivity.profile,
  )
  @JoinColumn()
  application_activity: ApplicationActivity;

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
