import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCourseRequired1620175004854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO pilares VALUES (1, 'Brain Fitness')`);
        await queryRunner.query(`INSERT INTO pilares VALUES (2, 'Inteligencia Emocional')`);
        await queryRunner.query(`INSERT INTO pilares VALUES (3, 'Mindfulness')`);
        await queryRunner.query(`INSERT INTO pilares VALUES (4, 'Intuição')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
