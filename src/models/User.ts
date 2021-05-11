import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, 
} from 'typeorm';

@Entity('Users')
class UserModel {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    user!: string;

    @Column()
    password!: string;

    @Column()
    isAdm!: boolean;

    @Column()
    OngId!: number;

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

export {
    UserModel
}