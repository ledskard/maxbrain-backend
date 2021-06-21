import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1620096392187 implements MigrationInterface {
    name = 'firstMigration1620096392187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("ID" SERIAL NOT NULL, "nome" character varying NOT NULL, "sobrenome" character varying NOT NULL, "email" character varying NOT NULL, "matricula" character varying NOT NULL, "senha" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_e55924127aed3a55c6c06ce10bd" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "pilares" ("ID" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0e6dc5c2096b4a619cee3c77a5b" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "meta" ("ID" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "data_inicio" TIMESTAMP NOT NULL, "data_final" TIMESTAMP NOT NULL, "pilar_id" integer, CONSTRAINT "PK_a578484844a28eb37c5522b3bb1" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "turma" ("ID" SERIAL NOT NULL, "descricao" character varying NOT NULL, "nome" character varying, "data_inicio" TIMESTAMP NOT NULL, "data_final" TIMESTAMP NOT NULL, "curso_id" integer, CONSTRAINT "PK_d61700d999bfea7dd039e615782" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "curso" ("ID" SERIAL NOT NULL, "nome" character varying NOT NULL, "codigo" character varying NOT NULL, "descricao" character varying NOT NULL, "data_inicio" TIMESTAMP NOT NULL, "data_final" TIMESTAMP NOT NULL, CONSTRAINT "PK_a77b3be314c60d5a1d2abc1c221" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "desenvolvimento_pessoal" ("ID" SERIAL NOT NULL, "mensagem" character varying NOT NULL, CONSTRAINT "PK_48088c12bf75b426838b27a9609" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "usuario_turma" ("usuario_id" integer NOT NULL, "turma_id" integer NOT NULL, CONSTRAINT "PK_31a6f1c44198f966c6e0dd47ae5" PRIMARY KEY ("usuario_id", "turma_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be6d48e998c0d470a579086daa" ON "usuario_turma" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_028a2dc9f459eea04ceadcfdac" ON "usuario_turma" ("turma_id") `);
        await queryRunner.query(`CREATE TABLE "meta_turma" ("turma_id" integer NOT NULL, "meta_id" integer NOT NULL, CONSTRAINT "PK_a9e7f1e56562f40a26f5ea2d4ed" PRIMARY KEY ("turma_id", "meta_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24336cb4475d99d1dfad170190" ON "meta_turma" ("turma_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_de73bfbb3c70bacdfd6b6c2faf" ON "meta_turma" ("meta_id") `);
        await queryRunner.query(`ALTER TABLE "meta" ADD CONSTRAINT "FK_6daf4a8b0fe84926a9576e44e2e" FOREIGN KEY ("pilar_id") REFERENCES "pilares"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turma" ADD CONSTRAINT "FK_a70d754fe6e447c37c4f3741d27" FOREIGN KEY ("curso_id") REFERENCES "curso"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_turma" ADD CONSTRAINT "FK_be6d48e998c0d470a579086daaa" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_turma" ADD CONSTRAINT "FK_028a2dc9f459eea04ceadcfdace" FOREIGN KEY ("turma_id") REFERENCES "turma"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meta_turma" ADD CONSTRAINT "FK_24336cb4475d99d1dfad1701905" FOREIGN KEY ("turma_id") REFERENCES "turma"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meta_turma" ADD CONSTRAINT "FK_de73bfbb3c70bacdfd6b6c2faf5" FOREIGN KEY ("meta_id") REFERENCES "meta"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta_turma" DROP CONSTRAINT "FK_de73bfbb3c70bacdfd6b6c2faf5"`);
        await queryRunner.query(`ALTER TABLE "meta_turma" DROP CONSTRAINT "FK_24336cb4475d99d1dfad1701905"`);
        await queryRunner.query(`ALTER TABLE "usuario_turma" DROP CONSTRAINT "FK_028a2dc9f459eea04ceadcfdace"`);
        await queryRunner.query(`ALTER TABLE "usuario_turma" DROP CONSTRAINT "FK_be6d48e998c0d470a579086daaa"`);
        await queryRunner.query(`ALTER TABLE "turma" DROP CONSTRAINT "FK_a70d754fe6e447c37c4f3741d27"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP CONSTRAINT "FK_6daf4a8b0fe84926a9576e44e2e"`);
        await queryRunner.query(`DROP INDEX "IDX_de73bfbb3c70bacdfd6b6c2faf"`);
        await queryRunner.query(`DROP INDEX "IDX_24336cb4475d99d1dfad170190"`);
        await queryRunner.query(`DROP TABLE "meta_turma"`);
        await queryRunner.query(`DROP INDEX "IDX_028a2dc9f459eea04ceadcfdac"`);
        await queryRunner.query(`DROP INDEX "IDX_be6d48e998c0d470a579086daa"`);
        await queryRunner.query(`DROP TABLE "usuario_turma"`);
        await queryRunner.query(`DROP TABLE "desenvolvimento_pessoal"`);
        await queryRunner.query(`DROP TABLE "curso"`);
        await queryRunner.query(`DROP TABLE "turma"`);
        await queryRunner.query(`DROP TABLE "meta"`);
        await queryRunner.query(`DROP TABLE "pilares"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
