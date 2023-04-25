import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export abstract class AppConfigServiceInterface {
  readonly mysqlUser: string;
  readonly mysqlPassword: string;
  readonly mysqlDatabase: string;
  readonly mysqlRootPassword: string;
  readonly mysqlHost: string;
  readonly jwtSecret: string;
  readonly jwtExpires: string;

  readonly mongoUserName: string;
  readonly mongoPassword: string;
  readonly mongoDatabase: string;
  readonly mongoHost: string;
  readonly mongoPort: string;

}

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
  constructor(private configService: ConfigService) {}

  get mysqlUser(): string {
    return this.configService.get<string>('app.mysqlUser');
  }
  get mysqlPassword(): string {
    return this.configService.get<string>('app.mysqlPassword');
  }
  get mysqlDatabase(): string {
    return this.configService.get<string>('app.mysqlDatabase');
  }
  get mysqlRootPassword(): string {
    return this.configService.get<string>('app.mysqlRootPassword');
  }
  get mysqlHost(): string {
    return this.configService.get<string>('app.mysqlHost');
  }
  get jwtSecret(): string {
    return this.configService.get<string>('app.jwtSecret');
  }
  get jwtExpires(): string {
    return this.configService.get<string>('app.jwtExpires');
  }
  get mongoUserName(): string {
    return this.configService.get<string>('app.mongoUserName');
  }
  get mongoPassword(): string {
    return this.configService.get<string>('app.mongoPassword');
  }
  get mongoDatabase(): string {
    return this.configService.get<string>('app.mongoDatabase');
  }
  get mongoHost(): string {
    return this.configService.get<string>('app.mongoHost');
  }
  get mongoPort(): string {
    return this.configService.get<string>('app.mongoPort');
  }


}
