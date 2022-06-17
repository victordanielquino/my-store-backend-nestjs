import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

export const setDefaultUser = async () => {
  const defaultUser = {
    email: process.env.DEFAULT_USER_EMAIL,
    pass: process.env.DEFAULT_USER_PASS,
    role: process.env.DEFAULT_USER_ROLE,
  };
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  client.connect();
  client
    .query(`SELECT * FROM users where email = '${defaultUser.email}'`)
    .then(async (res) => {
      const user = res.rows[0];
      if (!user) {
        const hashPassword = await bcrypt.hash(defaultUser.pass, 10);
        const newUser = [defaultUser.email, hashPassword, 0];
        const sqlInsertUser =
          'INSERT INTO users(email, password, role_id) VALUES($1, $2, $3)';
        client
          .query(`select * from roles where name = '${defaultUser.role}'`)
          .then((res) => {
            const role = res.rows[0];
            if (!role) {
              client
                .query(
                  `insert into roles (name) values ('${defaultUser.role}') returning id`,
                )
                .then((res) => {
                  newUser[2] = parseInt(res.rows[0].id);
                  client.query(sqlInsertUser, newUser).then((res) => {
                    client.end();
                  });
                });
            } else {
              newUser[2] = parseInt(role.id);
              client.query(sqlInsertUser, newUser).then((res) => {
                client.end();
              });
            }
          });
      } else {
        console.log('user exist');
        client.end();
      }
    });
  //const user = await client.query('select * from users');
};
