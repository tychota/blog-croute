module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'crouteuser',
  password: 'croutepassword',
  database: 'croutedb',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};
