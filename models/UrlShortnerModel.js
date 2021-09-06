const sequelize = require("./connect");
const { Sequelize } = require("sequelize");


var UrlShortner = sequelize.define('UrlShortner', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    LongUrl: { type: Sequelize.STRING },
    EmailAddress: { type: Sequelize.STRING },
    ShortUrl: { type: Sequelize.STRING },
    Hits: { type: Sequelize.INTEGER },
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





UrlShortner.sync({ alter: true });


module.exports = {
    UrlShortner

};