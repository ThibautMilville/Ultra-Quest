import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Recurrence } from '../recurrence/recurrence.entity';
import { Task } from '../task/task.entity';
import { UserQuest } from '../user-quest/user-quest.entity';
import { QuestReward } from '../quest-reward/quest-reward.entity';

@Entity('quest')
export class Quest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  params: string;

  @Column()
  state: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column()
  single: string;

  @Column()
  type: number;

  @Column({ type: 'uuid' })
  recurrence_id: string;

  @ManyToOne(() => Recurrence, recurrence => recurrence.quests)
  recurrence: Recurrence;

  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => Category, category => category.quests)
  category: Category;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Task, task => task.quest)
  tasks: Task[];

  @OneToMany(() => UserQuest, userQuest => userQuest.quest)
  userQuests: UserQuest[];

  @OneToMany(() => QuestReward, questReward => questReward.quest)
  questRewards: QuestReward[];
}