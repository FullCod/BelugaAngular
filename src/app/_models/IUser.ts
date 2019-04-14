import { IPhoto } from './IPhoto';

export interface IUser {
    id: number;
    userName: string;
    knownAs: string;
    email:string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interest?: string;
    photos?: IPhoto[];
    password: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}
