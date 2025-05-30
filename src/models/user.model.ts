import { Role } from '../types/role.js';
import { IBaseModel } from './base.model.js';

export interface IUser extends IBaseModel {
    email: string;
    Role: Role;
}

export default IUser;
