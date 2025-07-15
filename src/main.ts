import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Habilitar CORS para permitir llamadas desde el frontend
  app.enableCors({
    origin: '*', //frontend
    credentials: true,
  });

  await app.listen(process.env.PORT || 3004);
}
bootstrap();
