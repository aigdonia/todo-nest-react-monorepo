import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@codegenie/serverless-express';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4001);
}
bootstrap();

/**
 * Handler for lambda function
 */
export const handler = async (event: any, context) => {
  if (!server) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.enableCors();
    await nestApp.init();
    server = serverlessExpress({ app: nestApp.getHttpAdapter().getInstance() });
  }

  return server(event, context);
};
