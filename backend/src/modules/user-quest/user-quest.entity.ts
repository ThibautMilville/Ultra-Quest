import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Quest } from '../quest/quest.entity';
import { Recurrence } from '../recurrence/recurrence.entity';

@Entity('user_quest')
export class UserQuest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, user => user.userQuests)
  user: User;

  @Column({ type: 'uuid' })
  quest_id: string;

  @ManyToOne(() => Quest, quest => quest.userQuests)
  quest: Quest;

  @Column()
  state: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  completion_date: Date;

  @Column({ type: 'uuid', nullable: true })
  recurrence_id: string;

  @ManyToOne(() => Recurrence, recurrence => recurrence.userQuests)
  recurrence: Recurrence;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}