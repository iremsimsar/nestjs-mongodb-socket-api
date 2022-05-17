import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function server() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port: number = parseInt(process.env.PORT) || 3000
  app.useStaticAssets(join(__dirname, '..', 'static'));
  const config = new DocumentBuilder()
  .setTitle('Socket App Swagger')
  .setDescription('This is a room-based socket application.')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  }).catch(err => {
    console.error("error: ", err);
  })

}

server()
