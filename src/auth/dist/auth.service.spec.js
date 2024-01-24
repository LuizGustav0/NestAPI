"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@nestjs/testing");
var auth_service_1 = require("./auth.service");
var user_repository_mock_1 = require("../testing/user-repository.mock");
var jwt_service_mock_1 = require("../testing/jwt-service.mock");
var user_service_mock_1 = require("../testing/user-service.mock");
var mailer_service_mock_1 = require("../testing/mailer-service.mock");
var user_entity_list_mock_1 = require("../testing/user-entity-list.mock");
var access_token_mock_1 = require("../testing/access-token.mock");
var jwt_payload_mock_1 = require("../testing/jwt-payload.mock");
var reset_token_mock_1 = require("../testing/reset-token.mock");
var auth_register_sto_mock_1 = require("../testing/auth-register-sto.mock");
describe('AuthService', function () {
    var authService;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            auth_service_1.AuthService,
                            user_repository_mock_1.userRepositoryMock,
                            jwt_service_mock_1.jwtServiceMock,
                            user_service_mock_1.userServiceMock,
                            mailer_service_mock_1.mailerServiceMock
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    authService = module.get(auth_service_1.AuthService);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Validar a definição', function () {
        expect(authService).toBeDefined();
    });
    describe('Token', function () {
        test('createToken method', function () {
            var result = authService.createToken(user_entity_list_mock_1.userEntityList[0]);
            expect(result).toEqual({ accessToken: access_token_mock_1.accessToken });
        });
        test('checkToken method', function () {
            var result = authService.checkToken(access_token_mock_1.accessToken);
            expect(result).toEqual(jwt_payload_mock_1.jwtPayload);
        });
        test('isValidToken method', function () {
            var result = authService.isValidToken(access_token_mock_1.accessToken);
            expect(result).toEqual(true);
        });
    });
    describe('Autenticação', function () {
        test('login method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.login('luizteste1232@gmail.com', 'Teste@333')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ accessToken: access_token_mock_1.accessToken });
                        return [2 /*return*/];
                }
            });
        }); });
        test('forget method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.forget('luiz@teste.com')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        test('reset method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.reset('Teste@333', reset_token_mock_1.resetToken)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ accessToken: access_token_mock_1.accessToken });
                        return [2 /*return*/];
                }
            });
        }); });
        test('register method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.register(auth_register_sto_mock_1.authRegisterDTO)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ accessToken: access_token_mock_1.accessToken });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
