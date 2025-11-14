const { Connection } = require('pg');
const { Sequelize } = require('sequelize'); // imprt 
require('dotenv').config(); 

const Sequelize = new Sequelize (    // create instance
process.env.DB_USER,
process.env.DB_NAME,
process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,    // Localhost
    port: process.env.DB_PORT,    // PostgreSQL port (usually 5432)
    dialect: 'postgres',          // Database type
    logging: false,               // Disable SQL log in console (optional)
    pool: {
      max: 5,                    // Maximum connections
      min: 0,                    // Minimum connections  
      acquire: 30000,            // Max time to acquire connection
      idle: 10000                // Max time connection can be idle
    }
  }
);





//test data connection
const testconnection =async () =>{
    try {
        await sequelize.authenticate();
        console.log("connection established")
    } catch(error){
        console.log("connection failed")
        process.exit(1) // if connection fails exit
    }
    


}
module.exports = { sequelize, testConnection };