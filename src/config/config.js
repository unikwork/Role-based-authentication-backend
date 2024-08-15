require('dotenv').config();

module.exports = {
     database: {
          database: process.env.DB_DATABASE || 'auth_system',
          username: process.env.DB_USERNAME || 'root',
          password: process.env.DB_PASSWORD || '',
          host: process.env.DB_HOST || 'localhost',
          dialect: process.env.DB_DIALECT || 'mysql'
     },
     protocol: process.env.PROTOCOL || 'http',
     port: process.env.PORT || 3000,
     project_path: process.env.APP_PROJECT_PATH || 'http://localhost:3000',
     bcrypt_salt: process.env.BCRYPT_SALT || 10,
     jwt_secret: process.env.JWT_SECRET || 'Dyr0ULPKQ0xivxmKgpgBSy7aW9YjT1',
     jwt_token_expiry: process.env.JWT_TOKEN_EXPIRY || '10m'
};
