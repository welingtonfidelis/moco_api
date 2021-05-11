import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, 
    BeforeInsert, BeforeUpdate, DeleteDateColumn, BeforeRemove
} from 'typeorm';

@Entity('CashRegisterGroups')
class CashRegisterGroupModel {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @Column()
    OngId!: number;

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
    CashRegisterGroupModel
}