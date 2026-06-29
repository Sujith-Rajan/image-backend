"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
class SignupDto {
    name;
    email;
    phone;
    password;
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.MinLength)(3, {
        message: 'Name must be at least 3 characters long',
    }),
    (0, class_validator_1.Matches)(/^[A-Za-z ]+$/, {
        message: 'Name can contain only letters and spaces',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Please provide a valid email address',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 10, {
        message: 'Phone number must be exactly 10 digits',
    }),
    (0, class_validator_1.Matches)(/^[6-9]\d{9}$/, {
        message: 'Phone number must start with 6, 7, 8, or 9 and be 10 digits',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: 'Password must contain at least one uppercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
//# sourceMappingURL=signup.dto.js.map