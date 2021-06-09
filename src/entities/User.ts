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
    role?:string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserLoginInterface {
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
    user: string;
    email: string;
    password: string;
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

export interface UserUpdateProfileInterface {
    id: string;
    name: string;
    phone: string;
    birth: Date;
    address: string;
    ong_id: string;
}

export interface UserProfileInterface {
    name: string;
    user: string;
    email: string;
    phone: string;
    birth: Date;
    address: string;
    ong_name: string;
}

export interface UserUpdatePasswordInterface {
    id: string;
    ong_id: string;
    old_password?: string;
    new_password: string;
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