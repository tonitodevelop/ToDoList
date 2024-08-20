
export interface RegisterUser{
    username: string;
    name: string;
    password: string;
}

export interface LoginUser{
    username: string;
    password: string;
}

export interface UserDetail{
    id: number;
    userName: string;
}
export interface LoginUserResponse{
    token: string;
    userId: number;
    userName: string;
}