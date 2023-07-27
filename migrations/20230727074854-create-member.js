'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {   
        allowNull: false,  // 반드시 false여야함 (해당 column에는 항상값이 있어야함)
        autoIncrement: true,  //
        primaryKey: true,    // 데이터 베이스의 테이블에서 특정row를 고유하게 식별할수 있게해주는 column
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      admissionDate: {
        type: Sequelize.DATE
      },
      birthday: {
        type: Sequelize.DATE
      },
      profileImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),  // 추가하기
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),  // 추가하기 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};