'use strict';
// Getting environment
let ENVIRONMENT = process.env.NODE_ENV;
if (ENVIRONMENT === '' || ENVIRONMENT === undefined) {
  ENVIRONMENT = 'development';
}
// Loading configuration
const CONFIG = require('./config');
const Sequelize = require('sequelize');
const ROOT_PATH = __dirname; // jshint ignore:line

const migrationPath = ROOT_PATH + '/migrations-mysql';
const database = CONFIG.mysql.name || 'bigcommerce_dev';

// if (process.env.Database && process.env.Database === 'default_values') {
//   migrationPath = ROOT_PATH + '/migrations-postgre-for-default-values';
//   database = CONFIG.cockroach.dbNameForDefaultValues;
// }

doPostgreMigration();

async function doPostgreMigration() {
  try {
    const dialectOptions={
      multipleStatements: true,
      decimalNumbers: true,
    };

    const sequelize = new Sequelize(database, CONFIG.mysql.username, CONFIG.mysql.password, {
      dialect: 'mysql',
      port: CONFIG.mysql.port,
      host: CONFIG.mysql.host,
      pool: {
        max: 10,
        min: 0,
        idle: 1000,
      },
      dialectOptions: dialectOptions,
      omitNull: false,
      logging: console.log, // logger.info
    });

    await sequelize.authenticate();
    const Umzug = require('umzug');

    const umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: sequelize,
      },
      migrations: {
        params: [sequelize.getQueryInterface(), sequelize.constructor, function() {
          throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug"' +
              ' and return a promise instead.');
        }],
        path: migrationPath,
        pattern: /\.js$/,
      },
    });

    await umzug.up();
    console.info('MySql Migrations Completed.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}



// migrationfile 
/* eslint-disable new-cap */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('customer_request_details', {
      id: {
        type: Sequelize.INTEGER(255),
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: Sequelize.INTEGER(255),
        allowNull: false,
      },
      storeName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approvedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      approvedBy: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('customer_request_details');
  },
};
