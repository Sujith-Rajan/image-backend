import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
      origin: [
        "http://localhost:3000"
      ],
      credentials: true,
    });
    const PORT = process.env.PORT || 3001;
    await app.listen(PORT);
    console.log('🚀 Server running', PORT);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();