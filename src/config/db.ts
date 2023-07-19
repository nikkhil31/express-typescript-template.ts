import { User } from "@components/user/user.entity";
import { DataSource } from "typeorm";

export const createConnection = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "myAdmin@2023#",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ["{src, dist}/**/**/*.entity{.ts,.js}"],
    subscribers: [],
    migrations: [],
})