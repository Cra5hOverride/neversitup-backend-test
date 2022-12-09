import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configSerive = app.get(ConfigService);
  const PORT = configSerive.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Neversitup Backend Test')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 3000);

  console.log('MONGO URI -----> ', configSerive.get('MONGODB_URI_LOCAL'));

  console.log(`Consumer Application is running on: ${await app.getUrl()}`);
}
bootstrap();
