const isDevelopment = process.env.NODE_ENV === "development"

module.exports = {
   type: "postgres",
   host: process.env.HOST_DB,
   port: process.env.PORT_DB,
   username: process.env.USER_DB,
   password: process.env.PASS_DB,
   database: process.env.DATABASE,
   synchronize: false,
   migrationsRun: false,
   logging: false,
   entities: [isDevelopment ? "src/entities/*.ts" : "dist/entities/*.js"],
   migrations: [isDevelopment ? "src/migrations/*.ts" : "dist/migrations/*.js"],
   cli: {
      entitiesDir: isDevelopment ? "src/entities" : "dist/entities",
      migrationsDir: isDevelopment ? "src/migrations" : "dist/migrations",
   },
}
