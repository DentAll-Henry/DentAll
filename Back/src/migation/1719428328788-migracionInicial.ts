import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionInicial1719428328788 implements MigrationInterface {
    name = 'MigracionInicial1719428328788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stock" integer NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "product_id" uuid, "reportId" uuid, CONSTRAINT "PK_ae45e8e28ce6ca0ce3c77ba1202" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointment_id" character varying NOT NULL, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auths" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_a28e912dc6bde5945582f2be0a2" UNIQUE ("email"), CONSTRAINT "PK_22fc0631a651972ddc9c5a31090" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying(50) NOT NULL, "address" character varying NOT NULL, "location" character varying NOT NULL, "nationality" character varying NOT NULL, "deleteDate" TIMESTAMP, "auth" uuid, CONSTRAINT "UQ_c18da65793895769252e363e34d" UNIQUE ("dni"), CONSTRAINT "UQ_c77e8752faa45901af2b245dff2" UNIQUE ("email"), CONSTRAINT "REL_ef1d7960ba3545bf6103284c1a" UNIQUE ("auth"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_time" TIMESTAMP NOT NULL, "description" character varying(255), "dentist_id" character varying NOT NULL, "patientId" integer, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "systemic_background" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "info" character varying(100) NOT NULL, "clinicalHistoryId" uuid, CONSTRAINT "PK_ece19e1a8edf8253de4677ccb9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinical_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "guard_card" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_85f319658fa87f6e8e0d937e7f6" UNIQUE ("guard_card"), CONSTRAINT "PK_bc39a3e6645cdb43c64210bf833" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "person_id" uuid, "clinicalHistory_id" uuid, CONSTRAINT "REL_b829cf7046dfb9d4e510984e97" UNIQUE ("person_id"), CONSTRAINT "REL_cb74e14f5644ba9eab02e0b0be" UNIQUE ("clinicalHistory_id"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dental_serv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying(200) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_6ddd112993478d00054a1b30bbd" UNIQUE ("name"), CONSTRAINT "PK_76802d35cae895ec682082ae061" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people_roles" ("peopleId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_ccdb3638b37b04982c1981d39cd" PRIMARY KEY ("peopleId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a98be3db49637ef3d8130e755" ON "people_roles" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51935f695d98071cbac73668e4" ON "people_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "product_report" ADD CONSTRAINT "FK_02cd4d55a63a5af6098d44e2df0" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_report" ADD CONSTRAINT "FK_0eefac412a02130491accc29355" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_ef1d7960ba3545bf6103284c1a8" FOREIGN KEY ("auth") REFERENCES "auths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "systemic_background" ADD CONSTRAINT "FK_065df4322dd9d4bd304ced472ee" FOREIGN KEY ("clinicalHistoryId") REFERENCES "clinical_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_b829cf7046dfb9d4e510984e977" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_cb74e14f5644ba9eab02e0b0be0" FOREIGN KEY ("clinicalHistory_id") REFERENCES "clinical_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_roles" ADD CONSTRAINT "FK_6a98be3db49637ef3d8130e755f" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_roles" ADD CONSTRAINT "FK_51935f695d98071cbac73668e4d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_roles" DROP CONSTRAINT "FK_51935f695d98071cbac73668e4d"`);
        await queryRunner.query(`ALTER TABLE "people_roles" DROP CONSTRAINT "FK_6a98be3db49637ef3d8130e755f"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_cb74e14f5644ba9eab02e0b0be0"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_b829cf7046dfb9d4e510984e977"`);
        await queryRunner.query(`ALTER TABLE "systemic_background" DROP CONSTRAINT "FK_065df4322dd9d4bd304ced472ee"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_ef1d7960ba3545bf6103284c1a8"`);
        await queryRunner.query(`ALTER TABLE "product_report" DROP CONSTRAINT "FK_0eefac412a02130491accc29355"`);
        await queryRunner.query(`ALTER TABLE "product_report" DROP CONSTRAINT "FK_02cd4d55a63a5af6098d44e2df0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51935f695d98071cbac73668e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a98be3db49637ef3d8130e755"`);
        await queryRunner.query(`DROP TABLE "people_roles"`);
        await queryRunner.query(`DROP TABLE "dental_serv"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "clinical_history"`);
        await queryRunner.query(`DROP TABLE "systemic_background"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "auths"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "product_report"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
