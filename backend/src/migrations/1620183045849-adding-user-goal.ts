import {MigrationInterface, QueryRunner} from "typeorm";

export class addingUserGoal1620183045849 implements MigrationInterface {
    name = 'addingUserGoal1620183045849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario_meta" ("ID" SERIAL NOT NULL, "completada" boolean NOT NULL, "usuario_id" integer, "meta_id" integer, "turma_id" integer, CONSTRAINT "PK_8742d0297f9db0e3423442bd439" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "usuario_meta" ADD CONSTRAINT "FK_bd5f3572f016fcf9b17316c9803" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_meta" ADD CONSTRAINT "FK_7320f62d144f4c0093ed47e364f" FOREIGN KEY ("meta_id") REFERENCES "meta"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_meta" ADD CONSTRAINT "FK_753ce6f1e6c16447d0507273a6c" FOREIGN KEY ("turma_id") REFERENCES "turma"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_meta" DROP CONSTRAINT "FK_753ce6f1e6c16447d0507273a6c"`);
        await queryRunner.query(`ALTER TABLE "usuario_meta" DROP CONSTRAINT "FK_7320f62d144f4c0093ed47e364f"`);
        await queryRunner.query(`ALTER TABLE "usuario_meta" DROP CONSTRAINT "FK_bd5f3572f016fcf9b17316c9803"`);
        await queryRunner.query(`DROP TABLE "usuario_meta"`);
    }

}
