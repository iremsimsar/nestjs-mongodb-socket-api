import { NestFactory } from '@nestjs/core'

export class AppModule {}
async function main() {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT);
  console.log(process.env.PORT)
  await app.listen(port);
}
main();
