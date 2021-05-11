interface CashRegisterInterface {
    value: number;
    paidIn: Date;
    description: string;
    observation: string
    type: string;
    UserId: number;
    OngId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    CashRegisterInterface
}