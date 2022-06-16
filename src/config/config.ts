import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPass: process.env.POSTGRES_PASSWORD,
      dbPort: parseInt(process.env.POSTGRES_PORT),
      dbHost: process.env.POSTGRES_HOST,
    },
    defaultUser: {
      email: process.env.DEFAULT_USER_EMAIL,
      pass: process.env.DEFAULT_USER_PASS,
      role: process.env.DEFAULT_USER_ROLE,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
