import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { staticUrl } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(Config.prefix);
  app.useStaticAssets(Config.upload.path, {
    prefix: staticUrl,
    maxAge: Config.upload.max_age,
  })
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
