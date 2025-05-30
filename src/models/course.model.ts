import { IBaseModel } from './base.model.js';

export interface ICourse extends IBaseModel {
    description: string;
    price: Number;
    tags: string[];
    author: string;
}
