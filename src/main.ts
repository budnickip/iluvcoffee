import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // w połączeniu z whitelistem, jak ktoś będzie próbował wysłać coś więcej, to dostanie bad requesta(bez forbidNonWhitelisted, nie byloby bledu i dzialaloby normalnie,
      // tylko zostaloby okrojone o niechciane wartosci)
      forbidNonWhitelisted: true,
      // nie wiem jak to opisac, ale wtedy jakos lepiej konwertuje DTO'sy
      // just be aware that this feature may vary slightly impact performance.
      transform: true,
      // no longer have to expicitly specify Types with the @Type decorator
      transformOptions: {
        enableImplicitConversion: true,
      },
      // whitelist: true, nie przepuści do naszej aplikacji dodatkowych rzeczy, np nasze dto pozwala na przesłanie tylko name, brand i flavors
      // a ktoś będzie probował przesłać name, brand, flavors, hack - wtedy hack zostanie usunięty i w ogóle nie przyjdzie do naszej aplikacji
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter()); // use our custom handling for errors
  app.useGlobalGuards(new ApiKeyGuard()); // globalne wywołanie guarda, będzie dla kazdej routy
  await app.listen(3000);
}
bootstrap();
