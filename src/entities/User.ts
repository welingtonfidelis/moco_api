interface UserInterface {
    id?: number;
    name: string;
    email: string;
    user: string;
    password: string;
    isAdm: boolean;
    OngId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    UserInterface
}