import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserQuest } from '../user-quest/user-quest.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  wallet_id: string;

  @Column()
  wallet_id_version: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => UserQuest, userQuest => userQuest.user)
  userQuests: UserQuest[];
}