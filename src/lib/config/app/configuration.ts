import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  mysqlRootPassword: process.env.MYSQL_ROOT_PASSWORD,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlHost: process.env.MYSQL_HOST,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  mongoUserName: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDatabase: process.env.MONGO_DATABASE,
  mongoHost: process.env.MONGO_HOST,
  mongoPort: process.env.MONGO_PORT,
}));
