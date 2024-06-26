import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionInicial1719430798812 implements MigrationInterface {
    name = 'MigracionInicial1719430798812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointment_id" character varying NOT NULL, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stock" integer NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productsReport" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "report_id" uuid, CONSTRAINT "PK_ee9c0d56229e936a422b58fd3d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dental-serv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying(200) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e5a3b323be58c31d77294b49cd0" UNIQUE ("name"), CONSTRAINT "PK_4dee2dc4d914185c3b069e1f8e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auths" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_a28e912dc6bde5945582f2be0a2" UNIQUE ("email"), CONSTRAINT "PK_22fc0631a651972ddc9c5a31090" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "birthdate" TIMESTAMP NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying(50) NOT NULL, "address" character varying NOT NULL, "location" character varying NOT NULL, "nationality" character varying NOT NULL, "deleteDate" TIMESTAMP, "auth" uuid, CONSTRAINT "UQ_c18da65793895769252e363e34d" UNIQUE ("dni"), CONSTRAINT "UQ_c77e8752faa45901af2b245dff2" UNIQUE ("email"), CONSTRAINT "REL_ef1d7960ba3545bf6103284c1a" UNIQUE ("auth"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_time" TIMESTAMP NOT NULL, "description" character varying(255), "dentist_id" character varying NOT NULL, "patientId" uuid, "serviceId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_report" ("productReport_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_3d0355297ef0e567a4912390ce0" PRIMARY KEY ("productReport_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d32d4e5167ef6c6f84e78ce35" ON "products_report" ("productReport_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e5fef8c43e7c2ab4ab21336a5" ON "products_report" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "people_roles" ("peopleId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_ccdb3638b37b04982c1981d39cd" PRIMARY KEY ("peopleId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a98be3db49637ef3d8130e755" ON "people_roles" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51935f695d98071cbac73668e4" ON "people_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "productsReport" ADD CONSTRAINT "FK_1f24374b4390a040725b337dd23" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_ef1d7960ba3545bf6103284c1a8" FOREIGN KEY ("auth") REFERENCES "auths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d" FOREIGN KEY ("patientId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "dental-serv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_ef1d7960ba3545bf6103284c1a8"`);
        await queryRunner.query(`ALTER TABLE "productsReport" DROP CONSTRAINT "FK_1f24374b4390a040725b337dd23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51935f695d98071cbac73668e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a98be3db49637ef3d8130e755"`);
        await queryRunner.query(`DROP TABLE "people_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e5fef8c43e7c2ab4ab21336a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d32d4e5167ef6c6f84e78ce35"`);
        await queryRunner.query(`DROP TABLE "products_report"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "auths"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "dental-serv"`);
        await queryRunner.query(`DROP TABLE "productsReport"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
