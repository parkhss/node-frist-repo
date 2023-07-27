const Sequelize = require('sequelize'); // sequelize객체 가져오기
const config = require('../config/config.json');

const {
  username, password, database, host, dialect,
} = config.development;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const Member = require('./member')(sequelize, Sequelize.DataTypes); 
//member.js함수 가져오기

const db = {};
db.Member = Member;

module.exports = db;