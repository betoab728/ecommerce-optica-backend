import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_SERVER as string,
    username: process.env.DB_USER as string ,
    password: process.env.DB_PASSWORD as string ,
    database: process.env.DB_NAME as string,
    options: {
        encrypt: true, // Si usas Azure, true; en local puede ser false
        trustServerCertificate: true, 
    },
    entities: ["src/entities/*.ts"], 
    synchronize: true, // Solo en desarrollo, en producción usa migraciones
});
