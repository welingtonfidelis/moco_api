import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGroupsClients1615676454806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'CashRegisterGroups',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
        },
        {
            name: 'OngId',
            type: 'int'
        },
        {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
        },
        {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true
        }
      ],
      uniques: [
        {
          name: 'UNIQUE_CASHREGISTERGROUP_NAME',
          columnNames: ['name', 'OngId'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('CashRegisterGroups');
  }
}