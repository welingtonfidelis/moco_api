import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, 
    BeforeInsert, BeforeUpdate, DeleteDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { CashRegisterGroupModel } from './CashRegisterGroup';

@Entity('CashRegisters')
class CashRegisterModel {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    value!: number;

    @Column()
    paidIn!: Date;

    @Column()
    description!: string;

    @Column()
    observation!: string;

    @Column()
    type!: string;

    @Column()
    UserId!: number;

    @Column()
    OngId!: number;

    @Column()
    cashregister_group_id?: number;

    @ManyToOne(() => CashRegisterGroupModel)
    @JoinColumn({ name: 'cashregister_group_id' })
    cashRegisterGroup?: CashRegisterGroupModel

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @BeforeInsert()
    beforeInsertActions() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateDateUpdate() {
        this.updatedAt = new Date();
    }
}

export {
    CashRegisterModel
}