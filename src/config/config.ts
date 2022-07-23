import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
  };
});
