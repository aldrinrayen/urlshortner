const sequelize = require("./connect");
const { Sequelize } = require("sequelize");


var Users = sequelize.define('User', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    EmailAddress: { type: Sequelize.STRING },
    UserName: { type: Sequelize.STRING, allowNull: false },

    Password: { type: Sequelize.STRING(255) },
    CreatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    UpdatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    //=> This will disable the auto cretion of createdAt and updateAt column by sequalize
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});





Users.sync({ alter: true });


module.exports = {
    Users

};