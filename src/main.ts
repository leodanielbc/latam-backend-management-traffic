import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  const SWAGGER_ENVS = ['dev'];
  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(['/docs', '/docs-json'], basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }));

    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Main API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableCors();
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
