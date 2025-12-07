import { IsDate, IsNumber, IsString } from 'class-validator';
import { IBaseModel } from './base.model.js';

export class Course implements IBaseModel {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsDate()
    createdAt: Date;
    @IsDate()
    updateAt?: Date;
    @IsString()
    description: string;
    @IsNumber()
    price: Number;
    @IsString({ each: true })
    tags: string[];
    @IsString()
    author: string;
}
