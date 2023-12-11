import { DataSource } from "typeorm";

const connectDB =  new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    database: "postgres",
    logging: false,
    synchronize: true,
    entities: ["./entity/*.js"],

})

export default connectDB;