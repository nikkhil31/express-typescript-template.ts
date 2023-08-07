export interface IUser {
    id?: number
    firstName: string
    lastName: string
    type: number
}

export interface ILoginUser {
    email: string
    password: string
}

export interface IRegisterUser extends IUser, ILoginUser {}


