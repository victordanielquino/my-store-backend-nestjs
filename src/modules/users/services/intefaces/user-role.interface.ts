import {
  RoleReadDto,
  UserReadDto,
  UserRoleReadDto,
} from '../../../../core/dtos';

export interface UserRoleInterface {
  getAll(): Promise<UserRoleReadDto[]>;
  getAllByUserId(id: number): Promise<RoleReadDto[]>;
  getAllByRoleId(id: number): Promise<UserReadDto[]>;
  getOneById(id: number): Promise<UserRoleReadDto>;
}
