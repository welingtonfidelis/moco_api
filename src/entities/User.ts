export interface UserInterface {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    user: string;
    birth: Date;
    password: string;
    address?: string;
    ong_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserCreatedInterface {
    id: string;
}

export interface UserLoginInterface {
    name: string;
    email: string;
    token: string
}