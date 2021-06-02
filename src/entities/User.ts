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

export interface UserLoginInterface {
    name: string;
    email: string;
    token: string
}

export interface UserListInterface {
    id: string;
    name: string;
    email: string;
    phone: string;
    user: string;
    birth: Date;
    address: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserCreatedInterface {
    id: string;
}

export interface UserUpdateInterface {
    id: string;
    name: string;
    email: string;
    phone: string;
    user: string;
    birth: Date;
    address: string;
    ong_id: string;
}

export interface UserDeleteInterface {
    id: string;
    ong_id: string;
}

export interface UserResponseClientInterface {
    rows: UserListInterface[];
    count: number;
}

export interface UserFilterInterface {
    name: string;
    email: string;
}