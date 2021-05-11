import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Vendors extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Purchase, (purchase) => purchase.vendor)
  purchase: Purchase[];
}
