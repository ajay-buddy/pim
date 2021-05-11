import { Product } from 'src/products/products.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Catagory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.catagory)
  product: Product[];
}
