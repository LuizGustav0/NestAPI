"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("../user/entity/user.entity");
var AuthService = /** @class */ (function () {
    function AuthService(jwtService, userService, mailer, usersRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.mailer = mailer;
        this.usersRepository = usersRepository;
        this.audience = "users";
        this.issuer = "login";
    }
    AuthService.prototype.createToken = function (user) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                audience: this.audience,
                issuer: this.issuer
            })
        };
    };
    AuthService.prototype.checkToken = function (token) {
        try {
            var data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer
            });
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    };
    AuthService.prototype.isValidToken = function (token) {
        try {
            this.checkToken(token);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOneBy({
                            email: email
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException('E-mail e/ou senha incorretos.');
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new common_1.UnauthorizedException('E-mail e/ou senha incorretos.');
                        }
                        return [2 /*return*/, this.createToken(user)];
                }
            });
        });
    };
    AuthService.prototype.forget = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOneBy({
                            email: email
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException('E-mail não incorreto.');
                        }
                        token = this.jwtService.sign({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, {
                            expiresIn: "30 minutes",
                            subject: String(user.id),
                            audience: "forget",
                            issuer: "users"
                        });
                        return [4 /*yield*/, this.mailer.sendMail({
                                subject: "Recuperação de Senha",
                                to: user.email,
                                template: "forget",
                                context: {
                                    name: user.name,
                                    token: token
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AuthService.prototype.reset = function (password, token) {
        return __awaiter(this, void 0, void 0, function () {
            var data, salt, _a, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        data = this.jwtService.verify(token, {
                            audience: "forget",
                            issuer: "users"
                        });
                        if (isNaN(Number(data.id))) {
                            throw new common_1.BadRequestException("Token inválido");
                        }
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _b.sent();
                        _a = data;
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 2:
                        _a.password = _b.sent();
                        return [4 /*yield*/, this.usersRepository.update(Number(data.id), {
                                password: password
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.userService.show(Number(data.id))];
                    case 4:
                        user = _b.sent();
                        return [2 /*return*/, this.createToken(user)];
                    case 5:
                        error_1 = _b.sent();
                        throw new common_1.BadRequestException(error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delete data.role;
                        return [4 /*yield*/, this.userService.create(data)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, this.createToken(user)];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(3, typeorm_1.InjectRepository(user_entity_1.UserEntity))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
