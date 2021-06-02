import { CashRegisterGroupListInterface } from "./CashRegisterGroup";

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

export interface CashRegisterListInterface {
    id: string;
    description: string;
    observation: string;
    value: number;
    paid_in: Date;
    type: string;
    cash_register_group: CashRegisterGroupListInterface;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CashRegisterCreatedInterface {
    id: string;
}

export interface CashRegisterUpdateInterface {
    ong_id: string;
    id: string;
    description: string;
    observation: string;
    value: number;
    paid_in: Date;
    type: string;
    cash_register_group_id: string;
}

export interface CashRegisterDeleteInterface {
    id: string;
    ong_id: string;
}

export interface CashRegisterResponseClientInterface {
    rows: CashRegisterListInterface[];
    count: number;
}

export interface CashOnHandReport {
    total: number;
}

export interface CashRegisterReportItem {
    id: string;
    description: string;
    value: number;
    paid_in: Date;
    type: string;
    cash_register_group_description: string;
}
export interface CashRegisterReportList {
    date_start: string;
    date_end: string;
    revenue: number;
    expense: number;
    profit: number;
    count: number;
    rows: CashRegisterReportItem[]
}

export interface CashRegisterFilterInterface {
    date_start: string;
    date_end: string;
    description?: string;
    type?: string;
    cash_register_group_id?: string;
}