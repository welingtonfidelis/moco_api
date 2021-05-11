import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";

export class CashRegister_default1620675374143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns(
            'CashRegisters',
            [
                {
                    oldColumn: new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp'
                    }),
                    newColumn: new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    })
                },
                {
                    oldColumn: new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp'
                    }),
                    newColumn: new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    })
                },
            ]
        );

        await queryRunner.addColumn(
            'CashRegisters',
            new TableColumn({
                name: 'cashregister_group_id',
                type: 'int',
                isNullable: true
            })
        );

        await queryRunner.query(
            'ALTER TABLE public."CashRegisters" ADD CONSTRAINT CASHREGISTER_GROUPID_fkey ' +
            'FOREIGN KEY (cashregister_group_id) REFERENCES public."CashRegisterGroups";'
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            'CashRegisters',
            'cashregister_group_id'
        );
    }
}
