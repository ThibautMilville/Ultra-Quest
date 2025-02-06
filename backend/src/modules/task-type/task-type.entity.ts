import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task_type')
export class TaskType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subtitle: string;

  @Column()
  state: number;

  @Column()
  logo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}