'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/buchhaltung'

    // compose dev
    // uri: 'mongodb://kwdAdmin:YMAAWkaYJM0dw9pF@cockney.5.mongolayer.com:10006,cockney.4.mongolayer.com:10006/buchhaltungDev?replicaSet=set-56422798564f1bcc1e0004fc'
    // console:
    // mongo c6.cockney.5.mongolayer.com:10006/buchhaltungDev -u kwdAdmin -pYMAAWkaYJM0dw9pF
  },

  // Seed database on startup
  seedDB: false

};
