"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AuthRegisterDTO = void 0;
var create_user_dto_1 = require("../../user/dto/create-user.dto");
var AuthRegisterDTO = /** @class */ (function (_super) {
    __extends(AuthRegisterDTO, _super);
    function AuthRegisterDTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AuthRegisterDTO;
}(create_user_dto_1.CreateUserDTO));
exports.AuthRegisterDTO = AuthRegisterDTO;
