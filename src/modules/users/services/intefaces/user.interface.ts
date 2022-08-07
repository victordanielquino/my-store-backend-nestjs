import { UserAuthReadDto, UserReadDto } from '../../../../core/dtos';

export interface UserInterface {
  getAll(): Promise<UserReadDto[]>;
  getOneById(id: number): Promise<UserReadDto>;
  getOneByUsername(username: string): Promise<UserAuthReadDto>;
}
