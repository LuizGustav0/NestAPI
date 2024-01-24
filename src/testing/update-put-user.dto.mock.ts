import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  name: 'User Test',
  email: 'luiz@teste.com',
  birthAt: '2000-01-01',
  password: 'Teste@333',
  role: Role.User,
};
