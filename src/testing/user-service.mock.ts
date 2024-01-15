import { UserService } from "../user/user.service";
import { userEntityList } from "./user-entity-list.mock";

export const userServiceMock = {
    provide: UserService,
    useValue: {
       create: jest.fn().mockResolvedValue(userEntityList[0]),
       list: jest.fn().mockResolvedValue(userEntityList),
       show: jest.fn().mockResolvedValue(userEntityList[0]),
       update: jest.fn().mockResolvedValue(userEntityList[0]),
       updateParcial: jest.fn().mockResolvedValue(userEntityList[0]),
       delete: jest.fn().mockResolvedValue(true),
       exist: jest.fn().mockResolvedValue(true),
    }
}