interface UserLoginInterface {
    name: string;
    email: string;
    user: string;
    isAdm: boolean;
    token: string;
    createdAt?: Date;
}

export {
    UserLoginInterface
}