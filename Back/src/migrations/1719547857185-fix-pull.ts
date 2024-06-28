import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPull1719547857185 implements MigrationInterface {
    name = 'FixPull1719547857185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stock" integer NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productsReport" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "report_id" uuid, CONSTRAINT "PK_ee9c0d56229e936a422b58fd3d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deseases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "recordId" uuid, CONSTRAINT "PK_ac2b75d69b272a8e170c92f1192" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auths" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_a28e912dc6bde5945582f2be0a2" UNIQUE ("email"), CONSTRAINT "PK_22fc0631a651972ddc9c5a31090" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying(50) NOT NULL, "address" character varying, "location" character varying, "nationality" character varying, "is_auth0" boolean NOT NULL DEFAULT false, "deleteDate" TIMESTAMP, "auth" uuid, CONSTRAINT "UQ_c18da65793895769252e363e34d" UNIQUE ("dni"), CONSTRAINT "UQ_c77e8752faa45901af2b245dff2" UNIQUE ("email"), CONSTRAINT "REL_ef1d7960ba3545bf6103284c1a" UNIQUE ("auth"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "systemic_background" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "info" character varying(100) NOT NULL, "clinicalHistoryId" uuid, CONSTRAINT "PK_ece19e1a8edf8253de4677ccb9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinical_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "guard_card" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_85f319658fa87f6e8e0d937e7f6" UNIQUE ("guard_card"), CONSTRAINT "PK_bc39a3e6645cdb43c64210bf833" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "person_id" uuid, "clinicalHistory_id" uuid, CONSTRAINT "REL_b829cf7046dfb9d4e510984e97" UNIQUE ("person_id"), CONSTRAINT "REL_cb74e14f5644ba9eab02e0b0be" UNIQUE ("clinicalHistory_id"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dental_record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "health_Insurance" character varying(25) NOT NULL, "observations" character varying(150) NOT NULL, "medication" character varying(50) NOT NULL, CONSTRAINT "PK_49828183f5c3ee1bae5f2a946a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dental_serv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying(200) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "recordId" uuid, CONSTRAINT "UQ_6ddd112993478d00054a1b30bbd" UNIQUE ("name"), CONSTRAINT "PK_76802d35cae895ec682082ae061" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dentists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "career" character varying NOT NULL, "speciality" character varying NOT NULL, "person_id" uuid, CONSTRAINT "REL_8aa1576056cbbb4db27683d3fd" UNIQUE ("person_id"), CONSTRAINT "PK_ae1fbd6ec33d24fc0939c23325d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_time" TIMESTAMP NOT NULL, "description" character varying(255), "dentis_id" uuid, "patientId" uuid, "serviceId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointmentId" uuid, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "system_configs" ("slug_name" character varying NOT NULL, "title" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_a142ab57a241b44ba9e1f4feab4" UNIQUE ("slug_name"), CONSTRAINT "PK_a142ab57a241b44ba9e1f4feab4" PRIMARY KEY ("slug_name"))`);
        await queryRunner.query(`CREATE TABLE "guests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "dni" character varying NOT NULL, "address" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "email" character varying(50) NOT NULL, "reason" character varying(200) NOT NULL, CONSTRAINT "UQ_0ba53efff3e03d98b0dd52a7f6d" UNIQUE ("dni"), CONSTRAINT "UQ_85d472bf0e9dd55ce9a8268c3e0" UNIQUE ("email"), CONSTRAINT "PK_4948267e93869ddcc6b340a2c46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_report" ("productReport_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_3d0355297ef0e567a4912390ce0" PRIMARY KEY ("productReport_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d32d4e5167ef6c6f84e78ce35" ON "products_report" ("productReport_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e5fef8c43e7c2ab4ab21336a5" ON "products_report" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "people_roles" ("peopleId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_ccdb3638b37b04982c1981d39cd" PRIMARY KEY ("peopleId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a98be3db49637ef3d8130e755" ON "people_roles" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51935f695d98071cbac73668e4" ON "people_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "productsReport" ADD CONSTRAINT "FK_1f24374b4390a040725b337dd23" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deseases" ADD CONSTRAINT "FK_f2254c5ab0e8e90f8d0c99f84cd" FOREIGN KEY ("recordId") REFERENCES "dental_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_ef1d7960ba3545bf6103284c1a8" FOREIGN KEY ("auth") REFERENCES "auths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "systemic_background" ADD CONSTRAINT "FK_065df4322dd9d4bd304ced472ee" FOREIGN KEY ("clinicalHistoryId") REFERENCES "clinical_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_b829cf7046dfb9d4e510984e977" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_cb74e14f5644ba9eab02e0b0be0" FOREIGN KEY ("clinicalHistory_id") REFERENCES "clinical_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dental_serv" ADD CONSTRAINT "FK_53ad13c6c85939b22698374dcb1" FOREIGN KEY ("recordId") REFERENCES "dental_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dentists" ADD CONSTRAINT "FK_8aa1576056cbbb4db27683d3fd2" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_10e1c3f1dd3fc996189f55f1be5" FOREIGN KEY ("dentis_id") REFERENCES "dentists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "dental_serv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_624dba53e23dc24c94313775a31" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_report" ADD CONSTRAINT "FK_7d32d4e5167ef6c6f84e78ce35c" FOREIGN KEY ("productReport_id") REFERENCES "productsReport"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_report" ADD CONSTRAINT "FK_0e5fef8c43e7c2ab4ab21336a52" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_roles" ADD CONSTRAINT "FK_6a98be3db49637ef3d8130e755f" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_roles" ADD CONSTRAINT "FK_51935f695d98071cbac73668e4d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_roles" DROP CONSTRAINT "FK_51935f695d98071cbac73668e4d"`);
        await queryRunner.query(`ALTER TABLE "people_roles" DROP CONSTRAINT "FK_6a98be3db49637ef3d8130e755f"`);
        await queryRunner.query(`ALTER TABLE "products_report" DROP CONSTRAINT "FK_0e5fef8c43e7c2ab4ab21336a52"`);
        await queryRunner.query(`ALTER TABLE "products_report" DROP CONSTRAINT "FK_7d32d4e5167ef6c6f84e78ce35c"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_624dba53e23dc24c94313775a31"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_10e1c3f1dd3fc996189f55f1be5"`);
        await queryRunner.query(`ALTER TABLE "dentists" DROP CONSTRAINT "FK_8aa1576056cbbb4db27683d3fd2"`);
        await queryRunner.query(`ALTER TABLE "dental_serv" DROP CONSTRAINT "FK_53ad13c6c85939b22698374dcb1"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_cb74e14f5644ba9eab02e0b0be0"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_b829cf7046dfb9d4e510984e977"`);
        await queryRunner.query(`ALTER TABLE "systemic_background" DROP CONSTRAINT "FK_065df4322dd9d4bd304ced472ee"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_ef1d7960ba3545bf6103284c1a8"`);
        await queryRunner.query(`ALTER TABLE "deseases" DROP CONSTRAINT "FK_f2254c5ab0e8e90f8d0c99f84cd"`);
        await queryRunner.query(`ALTER TABLE "productsReport" DROP CONSTRAINT "FK_1f24374b4390a040725b337dd23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51935f695d98071cbac73668e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a98be3db49637ef3d8130e755"`);
        await queryRunner.query(`DROP TABLE "people_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e5fef8c43e7c2ab4ab21336a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d32d4e5167ef6c6f84e78ce35"`);
        await queryRunner.query(`DROP TABLE "products_report"`);
        await queryRunner.query(`DROP TABLE "guests"`);
        await queryRunner.query(`DROP TABLE "system_configs"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "dentists"`);
        await queryRunner.query(`DROP TABLE "dental_serv"`);
        await queryRunner.query(`DROP TABLE "dental_record"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "clinical_history"`);
        await queryRunner.query(`DROP TABLE "systemic_background"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "auths"`);
        await queryRunner.query(`DROP TABLE "deseases"`);
        await queryRunner.query(`DROP TABLE "productsReport"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
