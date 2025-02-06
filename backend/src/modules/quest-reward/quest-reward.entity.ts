import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quest } from '../quest/quest.entity';
import { Reward } from '../reward/reward.entity';

@Entity('quest_reward')
export class QuestReward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  quest_id: string;

  @ManyToOne(() => Quest, quest => quest.questRewards)
  quest: Quest;

  @Column({ type: 'uuid' })
  reward_id: string;

  @ManyToOne(() => Reward, reward => reward.questRewards)
  reward: Reward;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}