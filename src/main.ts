import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService }  from '@nestjs/config/dist';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

var whitelist = ['http://localhost:58269', 'http://localhost:46281'];
async function bootstrap() {
  const port  = new ConfigService().get<string>('PORT') || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  });

  let { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, ()=>{
    console.log(`App Successfuly Started On Port:${port} http://localhost:${port}`);    
  });
}
bootstrap();
