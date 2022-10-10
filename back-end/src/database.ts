import { Sequelize } from "sequelize-typescript";

import { initModels } from "./models/init-models";

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "dev",
    password: "Dev@1234",
    database: "SPS_ASSIGNMENT",
    logging: false,
});

export default connection;