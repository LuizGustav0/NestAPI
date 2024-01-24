import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  name: 'User Test',
  email: 'luiz@teste.com',
  birthAt: '2000-01-01',
  password: 'Teste@333',
  role: Role.User,
};
