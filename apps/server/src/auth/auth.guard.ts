import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { promisify } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  private issuer: string;
  private audience: string;

  constructor(private configService: ConfigService) {
    this.issuer = configService.get('AUTH0_ISSUER');
    this.audience = configService.get('AUTH0_AUDIENCE');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    // utilize this middleware into a promise for handy usage
    const checkJWT = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: false,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.issuer}.well-known/jwks.json`,
        }) as GetVerificationKey,
        issuer: this.issuer,
        audience: this.audience,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
