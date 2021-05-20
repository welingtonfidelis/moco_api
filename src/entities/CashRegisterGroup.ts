export interface CashRegisterGroupInterface {
    id?: string;
    description: string;
    observation?: string;
    ong_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface CashRegisterGroupCreatedInterface {
    id: string;
}

export interface CashRegisterGroupFilterInterface {
    description: string;
}