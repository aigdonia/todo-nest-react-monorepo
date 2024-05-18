import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest(); // from documentation
    return request.auth;
  },
);
