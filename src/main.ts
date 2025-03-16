import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { InMemorySessionStore } from './session/in-memory-session.store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionStore = new InMemorySessionStore();

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }),
  );

  app.use((req, res, next) => {
    console.log('Session Data:', req.session);
    next();
  });

  await app.listen(3000);
}
bootstrap();
