import { IUser } from './../_models/IUser';
import { IPhoto } from '../_models/IPhoto';
export class User implements IUser {
    knownAs: string;
    email: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interest?: string;
    photos?: IPhoto[];
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}
