import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function server() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port: number = parseInt(process.env.PORT) || 3000
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  }).catch(err => {
    console.error("error: ", err);
  })

}

server()
