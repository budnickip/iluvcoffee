import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

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
  // app.useGlobalGuards(new ApiKeyGuard()); // globalne wywołanie guarda, będzie dla kazdej routy // nie potrzebuje od kiedy dodalem to w common.module i zaimportowalem ten modul do app.module
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  ); // globalnie wywola interceptor dla kazdej routy

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //http://localhost:3000/api/ tutaj bedzie dostepna dokumentacja
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
