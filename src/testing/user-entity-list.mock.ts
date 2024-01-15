import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";

export const userEntityList: UserEntity[] = [{
    name: 'User Test',
    email: 'luiz@teste.com',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$ga1XDN4E/jrt.bGojyv0POeVPzpe/J6WcscK9VPFSSdvJijMxz4hu',
    role: Role.User,
    createdAt: new Date(),
    updateAt: new Date()
},
{
    name: 'User Test2',
    email: 'gustavo@teste.com',
    birthAt: new Date('2000-10-10'),
    id: 2,
    password: '$2b$10$ga1XDN4E/jrt.bGojyv0POeVPzpe/J6WcscK9VPFSSdvJijMxz4hu',
    role: Role.Admin,
    createdAt: new Date(),
    updateAt: new Date()
},
,
{
    name: 'User Test3',
    email: 'teste@teste.com',
    birthAt: new Date('2010-10-10'),
    id: 3,
    password: '$2b$10$ga1XDN4E/jrt.bGojyv0POeVPzpe/J6WcscK9VPFSSdvJijMxz4hu',
    role: Role.Admin,
    createdAt: new Date(),
    updateAt: new Date()
}
]