import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestReward } from '../quest-reward/quest-reward.entity';

@Entity('reward')
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: number;

  @Column()
  params: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => QuestReward, questReward => questReward.reward)
  questRewards: QuestReward[];
}