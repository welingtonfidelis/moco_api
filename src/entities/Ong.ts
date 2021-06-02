export interface OngInterface {
    id?: string;
    name: string;
    logo: string;
    cnpj: string;
    email: string;
    social_1: string;
    social_2: string;
    state_law: string;
    municipal_law: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface OngCreatedInterface {
    id: string;
    user: {
        id: string;
        user: string;
        email: string;
        password: string;
    }
}

export interface OngListInterface {
    id: string;
    name: string;
    logo: string;
    cnpj: string;
    email: string;
    social_1: string;
    social_2: string;
    state_law: string;
    municipal_law: string;
    created_at: Date;
    updated_at: Date;
}

export interface OngUpdateInterface {
    id: string;
    name: string;
    logo: string;
    cnpj: string;
    email: string;
    social_1: string;
    social_2: string;
    state_law: string;
    municipal_law: string;
}

export interface OngDeleteInterface {
    id: string;
}

export interface OngResponseClientInterface {
    rows: OngListInterface[];
    count: number;
}

export interface OngFilterInterface {
    name: string;
    social_1: string;
}