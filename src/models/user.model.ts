import {Role} from '../types/role.js';
type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  Role: Role;
};

export default User;
