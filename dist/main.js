"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use((0, cookie_parser_1.default)());
        app.enableCors({
            origin: [
                "http://localhost:3000"
            ],
            credentials: true,
        });
        const PORT = process.env.PORT || 3001;
        await app.listen(PORT);
        console.log('🚀 Server running', PORT);
    }
    catch (err) {
        console.log(err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map