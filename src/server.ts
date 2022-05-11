import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'

async function main() {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT) || 3000

  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  }).catch(err => {
    console.error("error: ", err);
  })

}

main()
