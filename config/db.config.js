module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Gain@123",
    PORT: 4432,
    DB: "Test",
    dialect: "postgres",
    dialectOptions: {
        options: {
            encrypt: true,
            enableArithAbort: true
        }
    }
};