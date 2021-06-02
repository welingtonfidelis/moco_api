export interface CashRegisterGroupInterface {
    id?: string;
    description: string;
    observation: string;
    ong_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface CashRegisterGroupListInterface {
    id: string;
    description: string;
    observation: string;
    created_at: Date;
    updated_at: Date;
}

export interface CashRegisterGroupCreatedInterface {
    id: string;
}

export interface CashRegisterGroupUpdateInterface {
    id: string;
    ong_id: string;
    description: string;
    observation: string;
}

export interface CashRegisterGroupDeleteInterface {
    id: string;
    ong_id: string;
}

export interface CashRegisterGroupResponseClientInterface {
    rows: CashRegisterGroupListInterface[];
    count: number;
}

export interface CashRegisterGroupFilterInterface {
    description: string;
}