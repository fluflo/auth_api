"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const connectDB = new typeorm_1.DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    database: "postgres",
    logging: false,
    synchronize: true,
    entities: ["./entity/*.js"],
});
exports.default = connectDB;
