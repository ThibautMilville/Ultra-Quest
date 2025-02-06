import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1738885029101 implements MigrationInterface {
    name = 'SchemaUpdate1738885029101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`wallet_id\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`subtitle\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`start_date\` timestamp NOT NULL, \`parent_id\` varchar(255) NULL, \`state\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`parentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recurrence\` (\`id\` varchar(36) NOT NULL, \`type\` int NOT NULL, \`params\` varchar(255) NOT NULL, \`start_date\` timestamp NOT NULL, \`end_date\` timestamp NULL, \`repeat_iteration\` int NOT NULL, \`parent_id\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`parentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`platform\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`type_id\` int NOT NULL, \`platform_id\` varchar(255) NOT NULL, \`action_id\` int NOT NULL, \`order\` int NOT NULL, \`quest_id\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`platformId\` varchar(36) NULL, \`questId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reward\` (\`id\` varchar(36) NOT NULL, \`type\` int NOT NULL, \`params\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quest_reward\` (\`id\` varchar(36) NOT NULL, \`quest_id\` varchar(255) NOT NULL, \`reward_id\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`questId\` varchar(36) NULL, \`rewardId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quest\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`params\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`start_date\` timestamp NOT NULL, \`end_date\` timestamp NULL, \`single\` varchar(255) NOT NULL, \`type\` int NOT NULL, \`recurrence_id\` varchar(255) NOT NULL, \`category_id\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`recurrenceId\` varchar(36) NULL, \`categoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_quest\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`quest_id\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`start_date\` timestamp NOT NULL, \`completion_date\` timestamp NULL, \`recurrence_id\` varchar(255) NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` varchar(36) NULL, \`questId\` varchar(36) NULL, \`recurrenceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reward_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`subtitle\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`logo\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_d5456fd7e4c4866fec8ada1fa10\` FOREIGN KEY (\`parentId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recurrence\` ADD CONSTRAINT \`FK_2f39dcbec25e5cc7a41491ad8bf\` FOREIGN KEY (\`parentId\`) REFERENCES \`recurrence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_95806d32c861205bdb3d8aeec6d\` FOREIGN KEY (\`platformId\`) REFERENCES \`platform\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_e86509cb45d566fae3c104e6c76\` FOREIGN KEY (\`questId\`) REFERENCES \`quest\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quest_reward\` ADD CONSTRAINT \`FK_09843ccb5577b79ed58431dc036\` FOREIGN KEY (\`questId\`) REFERENCES \`quest\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quest_reward\` ADD CONSTRAINT \`FK_821503f471d6e63ac1e058f69d6\` FOREIGN KEY (\`rewardId\`) REFERENCES \`reward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quest\` ADD CONSTRAINT \`FK_55ad3ef1917328f31b662e2b1b0\` FOREIGN KEY (\`recurrenceId\`) REFERENCES \`recurrence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quest\` ADD CONSTRAINT \`FK_c374170139446049a95e89db9b5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_quest\` ADD CONSTRAINT \`FK_28ef7a3cb952329439c57004b5b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_quest\` ADD CONSTRAINT \`FK_1a3529870506c3a3879ab833a44\` FOREIGN KEY (\`questId\`) REFERENCES \`quest\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_quest\` ADD CONSTRAINT \`FK_55b955f4dfa514ee84a8f8c084a\` FOREIGN KEY (\`recurrenceId\`) REFERENCES \`recurrence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_quest\` DROP FOREIGN KEY \`FK_55b955f4dfa514ee84a8f8c084a\``);
        await queryRunner.query(`ALTER TABLE \`user_quest\` DROP FOREIGN KEY \`FK_1a3529870506c3a3879ab833a44\``);
        await queryRunner.query(`ALTER TABLE \`user_quest\` DROP FOREIGN KEY \`FK_28ef7a3cb952329439c57004b5b\``);
        await queryRunner.query(`ALTER TABLE \`quest\` DROP FOREIGN KEY \`FK_c374170139446049a95e89db9b5\``);
        await queryRunner.query(`ALTER TABLE \`quest\` DROP FOREIGN KEY \`FK_55ad3ef1917328f31b662e2b1b0\``);
        await queryRunner.query(`ALTER TABLE \`quest_reward\` DROP FOREIGN KEY \`FK_821503f471d6e63ac1e058f69d6\``);
        await queryRunner.query(`ALTER TABLE \`quest_reward\` DROP FOREIGN KEY \`FK_09843ccb5577b79ed58431dc036\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_e86509cb45d566fae3c104e6c76\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_95806d32c861205bdb3d8aeec6d\``);
        await queryRunner.query(`ALTER TABLE \`recurrence\` DROP FOREIGN KEY \`FK_2f39dcbec25e5cc7a41491ad8bf\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_d5456fd7e4c4866fec8ada1fa10\``);
        await queryRunner.query(`DROP TABLE \`action\``);
        await queryRunner.query(`DROP TABLE \`task_type\``);
        await queryRunner.query(`DROP TABLE \`reward_type\``);
        await queryRunner.query(`DROP TABLE \`user_quest\``);
        await queryRunner.query(`DROP TABLE \`quest\``);
        await queryRunner.query(`DROP TABLE \`quest_reward\``);
        await queryRunner.query(`DROP TABLE \`reward\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`platform\``);
        await queryRunner.query(`DROP TABLE \`recurrence\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
