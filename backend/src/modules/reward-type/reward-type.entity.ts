import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reward_type')
export class RewardType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  state: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}