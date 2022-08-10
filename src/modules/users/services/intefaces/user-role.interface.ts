import {
  RoleReadDto,
  UserReadDto,
  UserRoleCreateDto,
  UserRoleReadDto,
} from '../../../../core/models/dtos';
import { User, UserRole } from '../../../../core/models/entities';

export interface UserRoleInterface {
  getAll(): Promise<UserRoleReadDto[]>;
  getAllByUserId(id: number): Promise<RoleReadDto[]>;
  getAllByRoleId(id: number): Promise<UserReadDto[]>;
  getOneById(id: number): Promise<UserRoleReadDto>;
  createOne(payload: UserRoleCreateDto): Promise<UserReadDto>;
  deleteByUserId(user: User): Promise<UserRole[]>;
}
