import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('action')
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  state: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}