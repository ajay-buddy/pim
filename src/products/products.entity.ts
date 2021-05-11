import { Catagory } from 'src/catagory/catagory.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PACKAGING } from './product-package.enum';
import { Status } from './product-status.enum';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  pprice: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  sprice: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  cgst: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  igst: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  quantity: number;

  @ManyToOne(() => Catagory, (catagory) => catagory.product)
  catagory: Catagory;

  @Column()
  package: PACKAGING;

  @Column()
  status: Status;
}
