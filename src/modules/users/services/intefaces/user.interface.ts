import {
  UserAuthReadDto,
  UserCreateDto,
  UserReadDto,
  UserUpdateDto,
} from '../../../../core/models/dtos';

export interface UserInterface {
  getAll(): Promise<UserReadDto[]>;
  getOneById(id: number): Promise<UserReadDto>;
  getOneByUsername(username: string): Promise<UserAuthReadDto>;
  createOne(payload: UserCreateDto): Promise<UserReadDto>;
  updateOne(id: number, change: UserUpdateDto): Promise<UserReadDto>;
}
