import { IUser } from "./IUser"; 

export interface ILoginSucess {
    login: boolean;
    user: IUser;
    token: string;
}