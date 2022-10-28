import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // w połączeniu z whitelistem, jak ktoś będzie próbował wysłać coś więcej, to dostanie bad requesta(bez forbidNonWhitelisted, nie byloby bledu i dzialaloby normalnie,
    // tylko zostaloby okrojone o niechciane wartosci)
    forbidNonWhitelisted: true,
    // nie wiem jak to opisac, ale wtedy jakos lepiej konwertuje DTO'sy
    // just be aware that this feature may vary slightly impact performance.
    transform: true,
    // whitelist: true, nie przepuści do naszej aplikacji dodatkowych rzeczy, np nasze dto pozwala na przesłanie tylko name, brand i flavors
    // a ktoś będzie probował przesłać name, brand, flavors, hack - wtedy hack zostanie usunięty i w ogóle nie przyjdzie do naszej aplikacji
    whitelist: true,
  }));
  await app.listen(3000);
}
bootstrap();
