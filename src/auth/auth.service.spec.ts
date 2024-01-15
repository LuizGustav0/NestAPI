import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/user-repository.mock"
import { jwtServiceMock } from "../testing/jwt-service.mock"
import { userServiceMock } from "../testing/user-service.mock"
import { mailerServiceMock } from "../testing/mailer-service.mock"
import { userEntityList } from "../testing/user-entity-list.mock"
import { accessToken } from "../testing/access-token.mock"
import { jwtPayload } from "../testing/jwt-payload.mock"

describe('AuthService', () => {

    let authService : AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                jwtServiceMock,
                userServiceMock,
                mailerServiceMock
            ]
        }).compile();

        authService = module.get(AuthService);
    })

    test('Validar a definição', () => {
        expect(authService).toBeDefined();
    })

    describe('Token', () => {
        test('createToken method', () => {
          const result = authService.createToken(userEntityList[0]);
    
    
          expect(result).toEqual({ accessToken });
        });
    
        test('checkToken method', () => {
          const result = authService.checkToken(accessToken);
    
          expect(result).toEqual(jwtPayload);
        });
    
        test('isValidToken method', () => {
          const result = authService.isValidToken(accessToken);
    
          expect(result).toEqual(true);
        });
      });


   

})