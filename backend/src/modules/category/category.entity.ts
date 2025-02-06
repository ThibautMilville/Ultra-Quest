import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quest } from '../quest/quest.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  image: string;

  @Column()
  logo: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @Column()
  state: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Quest, quest => quest.category)
  quests: Quest[];
}