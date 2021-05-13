export interface CashRegisterInterface {
    id?: string;
    description: string;
    observation?: string;
    value: number;
    paid_in: Date;
    type: string;
    cash_register_group_id: string;
    ong_id: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface CashRegisterCreatedInterface {
    id: string;
}