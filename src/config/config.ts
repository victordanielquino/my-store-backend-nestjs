import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresUrl: process.env.DATABASE_URL,
    defaultUser: {
      email: process.env.DEFAULT_USER_EMAIL,
      pass: process.env.DEFAULT_USER_PASS,
      role: process.env.DEFAULT_USER_ROLE,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
