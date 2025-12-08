/**
 * Basemodel where other models are inheriting from
 */

export interface IBaseModel {
    id: string;
    name: string;
    createdAt: Date;
    updateAt?: Date;
}
