module.exports = (sequelize, Sequelize) => {
     const User = sequelize.define('users', {
          id: {
               type: Sequelize.BIGINT.UNSIGNED,
               autoIncrement: true,
               allowNull: false,
               primaryKey: true,
          },
          name: {
               type: Sequelize.STRING,
               allowNull: false,
          },
          email: {
               type: Sequelize.STRING,
               allowNull: false,
          },
          password: {
               type: Sequelize.STRING,
               allowNull: false,
          },
          role: {
               type: Sequelize.ENUM('admin', 'user'),
               allowNull: false,
               defaultValue: 'user',
          },
          createdAt: {
               field: 'created_at',
               type: Sequelize.DATE,
               allowNull: false,
          },
          updatedAt: {
               field: 'updated_at',
               type: Sequelize.DATE,
               allowNull: false,
          },
     },
          {
               tableName: 'users',
          });

     return User;
};
