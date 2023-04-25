import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  //app.useGlobalFilters(new AllExceptionFilter(), new TypeOrmExceptionFilter());
  app.enableCors({
    origin: '*'
  });
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Api Gateway')
    .setDescription('The Api Gateway')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .addBasicAuth()
    .setContact('BursaBT', '', 'bursabilisimtoplulugu@gmail.com')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'BursaBT CRM Api Documentation',
  })

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on:
     \n http://localhost:${port}/${globalPrefix}
     \n🚀 Docs http://localhost:${port}/docs
     \n Kafka UI http://localhost:8080
    `
  );
   
}
bootstrap();
