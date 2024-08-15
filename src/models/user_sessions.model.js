module.exports = (sequelize, Sequelize) => {
    const UserSession = sequelize.define('user_sessions', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
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
    }, {
        tableName: 'user_sessions',
    });

    return UserSession;
}

