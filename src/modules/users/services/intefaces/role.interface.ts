import {
  RoleCreateDto,
  RoleReadDto,
  RoleUpdateDto,
} from '../../../../core/models/dtos';
import { Role } from '../../../../core/models/entities';

export interface RoleInterface {
  getAll(): Promise<RoleReadDto[]>;
  getOne(id: number): Promise<RoleReadDto>;
  getOneFull(id: number): Promise<Role>;
  createOne(payload: RoleCreateDto): Promise<RoleReadDto>;
  updateOne(id: number, change: RoleUpdateDto): Promise<RoleReadDto>;
  deleteOne(id: number): Promise<RoleReadDto>;
}
