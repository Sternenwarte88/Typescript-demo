import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { Role } from '../types/role.js';
import { IBaseModel } from './base.model.js';

/**
 * This class shapes the model for user and implements the IBaseModel
 */
export class User implements IBaseModel {
    @IsString()
    id: string = uuid();
    @IsString()
    name: string;
    @IsDate()
    @Type(() => Date)
    createdAt: Date;
    @Type(() => Date)
    @IsDate()
    updateAt?: Date | undefined;
    @IsEmail()
    email: string;
    @IsEnum(Role)
    Role: Role;
}

export default User;
