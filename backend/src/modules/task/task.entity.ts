import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Platform } from '../platform/platform.entity';
import { Quest } from '../quest/quest.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  state: number;

  @Column()
  type_id: number;

  @Column({ type: 'uuid' })
  platform_id: string;

  @ManyToOne(() => Platform, platform => platform.tasks)
  platform: Platform;

  @Column()
  action_id: number;

  @Column()
  order: number;

  @Column({ type: 'uuid' })
  quest_id: string;

  @ManyToOne(() => Quest, quest => quest.tasks)
  quest: Quest;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}