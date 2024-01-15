import { UserService } from "../user/user.service";

export const userServiceMock = {
    provide: UserService,
    useValue: {
       create: jest.fn(),
       list: jest.fn(),
       show: jest.fn(),
       update: jest.fn(),
       updateParcial: jest.fn(),
       delete: jest.fn(),
       exist: jest.fn(),
    }
}