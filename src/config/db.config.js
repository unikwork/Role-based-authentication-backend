const Sequelize = require('sequelize');
const config = require('./config');
const { addStaticData } = require('../controllers/static_data.controller.js');

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
     host: config.database.host,
     dialect: config.database.dialect,
     operatorsAliases: 0,
     pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
     },
     logging: false,
});

const dbConnectTest = async () => {
     try {
          await sequelize.authenticate();
          console.log('Database Connection has been established successfully.');
     } catch (error) {
          console.error('Unable to connect to the database:', error);
     }
}
dbConnectTest()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ====== MODELS ===== //
db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.user_sessions = require('../models/user_sessions.model.js')(sequelize, Sequelize);

// ====== ASSOCIATIONS ===== //
db.users.hasMany(db.user_sessions, { foreignKey: 'user_id' });
db.user_sessions.belongsTo(db.users, { foreignKey: 'user_id' });


(async function (db) {
     try {
          await db.sequelize.sync({ alter: true });
          await addStaticData(db);
     } catch (error) {
          console.log('Error when static data added :>> ', error);
     };
})(db);

module.exports = db