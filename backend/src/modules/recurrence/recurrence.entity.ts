import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quest } from '../quest/quest.entity';
import { UserQuest } from '../user-quest/user-quest.entity';

@Entity('recurrence')
export class Recurrence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: number;

  @Column()
  params: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column()
  repeat_iteration: number;

  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @ManyToOne(() => Recurrence, recurrence => recurrence.children)
  parent: Recurrence;

  @OneToMany(() => Recurrence, recurrence => recurrence.parent)
  children: Recurrence[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Quest, quest => quest.recurrence)
  quests: Quest[];

  @OneToMany(() => UserQuest, userQuest => userQuest.recurrence)
  userQuests: UserQuest[];
}